<script setup lang="ts">
import { useToast } from 'vue-toastification';
useToast();
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@use './styles/base.scss';
</style>
