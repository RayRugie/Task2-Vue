<script lang="ts" setup>
import AuthForm from '../components/AuthForm.vue';
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


