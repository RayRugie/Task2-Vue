<script lang="ts" setup>
import AuthForm from '../components/AuthForm.vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
const router = useRouter();
onMounted(() => {
  const session = typeof window !== 'undefined' ? window.localStorage.getItem('ticketapp_session') : null;
  if (session) router.push('/dashboard');
});
</script>

<template>
  <div class="auth-page">
    <header>
      <router-link to="/" class="back-link">Back</router-link>
    </header>
    <AuthForm mode="login" />
  </div>
</template>

<style lang="scss">
@use '../styles/auth.scss';
</style>


