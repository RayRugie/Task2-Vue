<script lang="ts" setup>
import wave from '../assets/wave.svg';
</script>

<template class="hero-container">
  <section class="hero">
    <div class="hero-content">
      <h2>Manage Tickets. Simplify Support.</h2>
      <p>
        Ticketa helps teams resolve issues faster — from customer requests to
        internal operations. One dashboard. Endless clarity.
      </p>
      <div class="cta-buttons">
        <router-link to="/auth/signup" class="btn primary">Get Started</router-link>
        <router-link to="/auth/login" class="btn secondary">Login</router-link>
      </div>
    </div>
    <div class="decor-circle" />
    <div class="decor-circle1" />
    <img :src="wave" alt="wave" class="wave" />
  </section>
</template>

<style scoped lang="scss">
</style>


