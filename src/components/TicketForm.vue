<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';

type TicketStatus = 'open' | 'in_progress' | 'closed';

interface InitialData {
  id?: string | number;
  title: string;
  description: string;
  status: TicketStatus;
}

interface Props {
  mode: 'create' | 'edit';
  initialData?: InitialData;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'submit', data: { title: string; description: string; status: TicketStatus }): void; (e: 'cancel'): void }>();

const title = ref('');
const description = ref('');
const status = ref<TicketStatus>('open');
const error = ref('');
const fieldErrors = ref<{ title?: string; status?: string; description?: string }>({});

const resetOrLoad = () => {
  if (props.initialData) {
    title.value = props.initialData.title;
    description.value = props.initialData.description;
    status.value = props.initialData.status;
  } else {
    title.value = '';
    description.value = '';
    status.value = 'open';
  }
};

onMounted(resetOrLoad);
watch(() => props.initialData, resetOrLoad);

const handleSubmit = (e: Event) => {
  e.preventDefault();
  fieldErrors.value = {};
  if (!title.value.trim()) fieldErrors.value.title = 'Title is required.';
  if (!status.value) fieldErrors.value.status = 'Status is required.';
  if (description.value && description.value.length > 500) fieldErrors.value.description = 'Description must be 500 characters or fewer.';
  if (Object.keys(fieldErrors.value).length > 0) { error.value = 'Please fix the errors below.'; return; }
  error.value = '';
  emit('submit', { title: title.value, description: description.value, status: status.value });
};
</script>

<template>
  <div class="ticket-form-container">
    <h3>{{ props.mode === 'create' ? 'Create New Ticket' : 'Edit Ticket' }}</h3>

    <p v-if="error" class="error">{{ error }}</p>

    <form @submit="handleSubmit" class="ticket-form" role="form" aria-labelledby="ticketFormTitle">
      <label>
        Title
        <input type="text" placeholder="Enter ticket title" v-model="title" :aria-invalid="!!fieldErrors.title" aria-describedby="titleError" />
        <small v-if="fieldErrors.title" id="titleError" class="error">{{ fieldErrors.title }}</small>
      </label>

      <label>
        Description
        <textarea placeholder="Describe the issue or task" v-model="description" :aria-invalid="!!fieldErrors.description" aria-describedby="descError" />
        <small v-if="fieldErrors.description" id="descError" class="error">{{ fieldErrors.description }}</small>
      </label>

      <label>
        Status
        <select v-model="status" :aria-invalid="!!fieldErrors.status" aria-describedby="statusError">
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <small v-if="fieldErrors.status" id="statusError" class="error">{{ fieldErrors.status }}</small>
      </label>

      <div class="form-actions">
        <button type="submit" class="submit-btn">{{ props.mode === 'create' ? 'Create Ticket' : 'Save Changes' }}</button>
        <button type="button" class="cancel-btn" @click="emit('cancel')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/TicketForm.scss';
</style>


