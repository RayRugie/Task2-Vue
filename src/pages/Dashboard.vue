<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { supaAuth } from '../utils/auth';
import { supabase } from '../utils/supabaseClient';

interface TicketStats {
  total: number;
  open: number;
  resolved: number;
}

const userEmail = ref<string | null>(null);
const stats = reactive<TicketStats>({ total: 0, open: 0, resolved: 0 });
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  // ✅ Check authentication
  const isAuth = await supaAuth.isAuthenticated();
  if (!isAuth) {
    router.push('/login');
    return;
  }

  // ✅ Get current user info
  const user = await supaAuth.getUser();
  userEmail.value = (user as any)?.email ?? '';

  //  Fetch tickets from Supabase
  const { data: tickets, error } = await supabase
    .from('tickets')
    .select('status');

  if (error) {
    console.error('Error fetching tickets:', error.message);
    return;
  }

  //  Compute stats dynamically
  const total = tickets.length;
  const open = tickets.filter((t: any) => t.status === 'open').length;
  const resolved = tickets.filter((t: any) => t.status === 'resolved').length;

  stats.total = total;
  stats.open = open;
  stats.resolved = resolved;
});

const handleLogout = async () => {
  await supaAuth.logout();
  window.localStorage.removeItem('ticketapp_session');
  router.push('/');
};

const goTo = (path: string) => router.push(path);
const isActive = (path: string) => route.path === path;
</script>

<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Ticketa</h2>
      </div>
      <nav class="nav-links">
        <button
          :class="isActive('/dashboard') ? 'nav-link active' : 'nav-link'"
          @click="goTo('/dashboard')"
        >
          🏠 Dashboard
        </button>
        <button
          :class="isActive('/tickets') ? 'nav-link active' : 'nav-link'"
          @click="goTo('/tickets')"
        >
          🎟️ Tickets
        </button>
        <button
          :class="isActive('/settings') ? 'nav-link active' : 'nav-link'"
          @click="goTo('/settings')"
        >
          ⚙️ Settings
        </button>
      </nav>
      <div class="sidebar-footer">
        <p>{{ userEmail }}</p>
        <button class="logout-btn" @click="handleLogout">Logout</button>
      </div>
    </aside>

    <main class="dashboard-content">
      <header class="dashboard-top">
        <h1>Dashboard Overview</h1>
        <p>Track your ticket statistics in real-time.</p>
      </header>

      <section class="stats-grid">
        <div class="stat-card total">
          <h3>Total Tickets</h3>
          <p>{{ stats.total }}</p>
        </div>
        <div class="stat-card open">
          <h3>Open Tickets</h3>
          <p>{{ stats.open }}</p>
        </div>
        <div class="stat-card resolved">
          <h3>Resolved Tickets</h3>
          <p>{{ stats.resolved }}</p>
        </div>
      </section>

      <section class="manage-section">
        <button class="manage-btn" @click="goTo('/tickets')">
          Go to Ticket Management
        </button>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/dashboard.scss';
</style>
