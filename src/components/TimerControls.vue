<script setup>
defineProps({
  isRunning: { type: Boolean, default: false },
})
defineEmits(['toggle', 'reset'])
</script>

<template>
  <div class="controls">
    <button
      class="btn-reset"
      @click="$emit('reset')"
      aria-label="Reset timer"
      title="Reset"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    </button>

    <button
      class="btn-main"
      @click="$emit('toggle')"
      :aria-label="isRunning ? 'Pause timer' : 'Start timer'"
    >
      <!-- Play icon -->
      <svg v-if="!isRunning" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <polygon points="5,3 19,12 5,21" />
      </svg>
      <!-- Pause icon -->
      <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="6" y="4" width="4" height="16" rx="1" />
        <rect x="14" y="4" width="4" height="16" rx="1" />
      </svg>
    </button>

    <!-- Spacer to balance reset button -->
    <div class="spacer" aria-hidden="true"></div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
}

.spacer {
  width: 52px;
  height: 52px;
}

.btn-main {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-clay), var(--shadow-md);
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease;
  border: 3px solid var(--primary-dark);
  padding-left: 3px;
}

.btn-main:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 5px 7px 0px rgba(61, 43, 31, 0.18), var(--shadow-md);
}

.btn-main:active {
  transform: translateY(2px) scale(0.97);
  box-shadow: 2px 2px 0px rgba(61, 43, 31, 0.18);
}

.btn-reset {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--bg-alt);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2.5px solid var(--border);
  box-shadow: 3px 3px 0px rgba(61,43,31,0.12);
  transition: transform 0.15s ease, color 0.15s ease;
}

.btn-reset:hover {
  color: var(--text);
  transform: translateY(-1px);
}

.btn-reset:active {
  transform: translateY(1px) scale(0.96);
  box-shadow: 1px 1px 0px rgba(61,43,31,0.1);
}

@media (min-width: 640px) {
  .btn-main {
    width: 84px;
    height: 84px;
  }
}
</style>
