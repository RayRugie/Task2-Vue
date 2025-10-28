<script lang="ts" setup>
interface Props {
  id: string | number;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'edit', id: string | number): void; (e: 'delete', id: string | number): void }>();
</script>

<template>
  <div class="ticket-card">
    <div class="ticket-header">
      <h3>{{ props.title }}</h3>
      <span class="status-tag" :class="props.status">{{ props.status }}</span>
    </div>

    <p class="ticket-desc">{{ props.description }}</p>

    <div class="ticket-footer">
      <p class="ticket-date">Created: {{ new Date(props.createdAt).toLocaleDateString() }}</p>
      <div class="ticket-actions">
        <button class="edit-btn" @click="emit('edit', props.id)">✏️ Edit</button>
        <button class="delete-btn" @click="emit('delete', props.id)">🗑️ Delete</button>
      </div>
    </div>
  </div>
</template>

<style   lang="scss">
@use '../styles/TicketCard.scss';
</style>


