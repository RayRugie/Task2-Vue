<script lang="ts" setup>
import Header from '../components/Header.vue';
import Hero from '../components/Hero.vue';
import Features from '../components/Features.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <div class="landing-container">
    <Header />
    <Hero />
    <Features />
    <Footer />
  </div>
</template>

<style lang="scss">
@use '../styles/landing.scss';
</style>


