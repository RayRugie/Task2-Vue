<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goLogin = () => router.push('/auth/login');
const goSignup = () => router.push('/auth/signup');
</script>

<template>
  <header class="header">
    <h1 class="logo">Ticketa</h1>
    <nav class="nav">
      <button class="btn login" @click="goLogin">Login</button>
      <button class="btn get-started" @click="goSignup">Get Started</button>
    </nav>
  </header>
</template>

<style scoped lang="scss">

</style>


