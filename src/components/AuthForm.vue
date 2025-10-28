<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supaAuth } from '../utils/auth';
import { useToast } from 'vue-toastification';

interface Props { mode: 'login' | 'signup' }
const props = defineProps<Props>();

const router = useRouter();
const toast = useToast();

const email = ref('');
const password = ref('');
const loading = ref(false);

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  loading.value = true;
  if (!email.value || !password.value) {
    toast.error('All fields are required');
    loading.value = false;
    return;
  }
  try {
    if (props.mode === 'signup') {
      const { error } = await supaAuth.signup(email.value, password.value);
      if (error) throw error as unknown as Error;
      toast.success('Signup successful! Redirecting...');
      window.localStorage.setItem('ticketapp_session', 'true');
      setTimeout(() => router.push('/dashboard'), 1000);
    } else {
      const { error } = await supaAuth.login(email.value, password.value);
      if (error) throw error as unknown as Error;
      toast.success('Login successful! Redirecting...');
      window.localStorage.setItem('ticketapp_session', 'true');
      setTimeout(() => router.push('/dashboard'), 1000);
    }
  } catch (error: any) {
    toast.error(error?.message || 'Something went wrong');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="auth-container">
    <form class="auth-form" @submit="handleSubmit" role="form" aria-labelledby="authFormTitle">
      <h2 id="authFormTitle">{{ props.mode === 'login' ? 'Welcome Back' : 'Create an Account' }}</h2>

      <label>
        Email
        <input type="email" placeholder="you@example.com" v-model="email" required aria-required="true" aria-label="Email address" />
      </label>

      <label>
        Password
        <input type="password" placeholder="********" v-model="password" required aria-required="true" aria-label="Password" />
      </label>

      <button type="submit" :disabled="loading" :aria-busy="loading">
        {{ loading ? 'Please wait...' : (props.mode === 'login' ? 'Login' : 'Sign Up') }}
      </button>

      <p class="switch">
        <template v-if="props.mode === 'login'">
          Don’t have an account? <router-link to="/signup">Sign up</router-link>
        </template>
        <template v-else>
          Already have an account? <router-link to="/login">Login</router-link>
        </template>
      </p>
    </form>
  </div>
  </template>

<style scoped lang="scss">
@use '../styles/auth.scss';
</style>


