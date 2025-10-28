<script lang="ts" setup>
const features = [
  { title: 'Create & Track Tickets', desc: 'Easily create, assign, and monitor tickets in one clean dashboard.' },
  { title: 'Collaborate Efficiently', desc: 'Keep your team synced with real-time updates and smart filters.' },
  { title: 'Analytics that Matter', desc: 'Gain insights into ticket trends and performance at a glance.' },
];
</script>

<template>
  <section class="features">
    <div v-for="(feature, i) in features" :key="i" class="feature-box">
      <h3>{{ feature.title }}</h3>
      <p>{{ feature.desc }}</p>
    </div>
  </section>
  </template>

<style scoped lang="scss">

</style>


