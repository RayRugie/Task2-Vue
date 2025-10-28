<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../utils/supabaseClient';
import { supaAuth } from '../utils/auth';
import TicketCard from '../components/TicketCard.vue';
import TicketForm from '../components/TicketForm.vue';
import { useToast } from 'vue-toastification';

type TicketStatus = 'open' | 'in_progress' | 'closed';
interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
  email: string;
}

const tickets = ref<Ticket[]>([]);
const selectedTicket = ref<Ticket | null>(null);
const loading = ref(false);
const formKey = ref(0);
const router = useRouter();
const toast = useToast();

onMounted(() => {
  fetchTickets();
});

const fetchTickets = async () => {
  try {
    loading.value = true;
    const user: any = await supaAuth.getUser();
    const userEmail = user?.email || user?.user?.email;
    if (!userEmail) {
      toast.error('User not found. Please log in again.');
      return;
    }
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('email', userEmail)
      .order('created_at', { ascending: false });
    if (error) throw error;
    tickets.value = (data as Ticket[]) || [];
  } catch (err) {
    console.error('Fetch error:', err);
    toast.error('Failed to load tickets. Please retry.');
  } finally {
    loading.value = false;
  }
};

const handleSaveTicket = async (ticketData: Partial<Ticket>) => {
  try {
    const user: any = await supaAuth.getUser();
    const userEmail = user?.email || user?.user?.email;
    if (!userEmail) {
      toast.error('Your session has expired — please log in again.');
      return;
    }
    if (!ticketData.title || !ticketData.description || !ticketData.status) {
      toast.error('All fields are required');
      return;
    }
    if (selectedTicket.value) {
      const { error } = await supabase
        .from('tickets')
        .update({
          title: ticketData.title,
          description: ticketData.description,
          status: ticketData.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', selectedTicket.value.id)
        .eq('email', userEmail);
      if (error) throw error;
      toast.success('✅ Ticket updated successfully!');
      selectedTicket.value = null;
    } else {
      const { error } = await supabase.from('tickets').insert([
        {
          title: ticketData.title,
          description: ticketData.description,
          status: ticketData.status,
          email: userEmail,
        },
      ]);
      if (error) throw error;
      toast.success('🎟️ Ticket created successfully!');
      // reset form back to empty state
      selectedTicket.value = null;
      formKey.value++;
    }
    fetchTickets();
  } catch (err) {
    console.error('Save error:', err);
    toast.error('Failed to save ticket. Please retry.');
  }
};

const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this ticket?')) return;
  try {
    const { error } = await supabase.from('tickets').delete().eq('id', id);
    if (error) throw error;
    toast.success('🗑️ Ticket deleted successfully!');
    fetchTickets();
  } catch (err) {
    console.error('Delete error:', err);
    toast.error('Failed to delete ticket. Please retry.');
  }
};

const handleEdit = (id: string | number) => {
  const t = tickets.value.find((t) => t.id === Number(id));
  if (t) selectedTicket.value = t;
};
</script>

<template>
  <div class="tickets-page">
    <button class="back-button" @click="router.push('/dashboard')">←  Back</button>
    <div class="tickets-container">
      <h1>🎫 Ticket Management</h1>
      <p>Manage your tickets — create, edit, and resolve issues easily.</p>

      <TicketForm
        :key="formKey"
        :mode="selectedTicket ? 'edit' : 'create'"
        :initialData="selectedTicket ? { id: selectedTicket.id, title: selectedTicket.title, description: selectedTicket.description, status: selectedTicket.status } : undefined"
        @submit="handleSaveTicket"
        @cancel="() => (selectedTicket = null)"
      />

      <div class="tickets-list">
        <p v-if="loading" class="loading">Loading tickets...</p>
        <p v-else-if="tickets.length === 0" class="no-tickets">No tickets found. Create one above!</p>
        <template v-else>
          <TicketCard
            v-for="ticket in tickets"
            :key="ticket.id"
            :id="ticket.id"
            :title="ticket.title"
            :description="ticket.description"
            :status="ticket.status"
            :createdAt="ticket.created_at"
            @edit="handleEdit"
            @delete="handleDelete"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
 @use '../styles/Tickets.scss' as *;
</style>


