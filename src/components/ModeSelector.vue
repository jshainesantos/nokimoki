<script setup>
defineProps({
  current: { type: String, default: 'work' },
})
defineEmits(['select'])
</script>

<template>
  <nav class="mode-bar" role="tablist" aria-label="Timer mode">
    <button
      v-for="(label, key) in { work: 'Focus', short: 'Short Break', long: 'Long Break' }"
      :key="key"
      class="mode-btn"
      :class="{ active: current === key }"
      role="tab"
      :aria-selected="current === key"
      @click="$emit('select', key)"
    >
      {{ label }}
    </button>
  </nav>
</template>

<style scoped>
.mode-bar {
  display: flex;
  gap: 8px;
  background: var(--bg-alt);
  border: 2px solid var(--border);
  border-radius: 999px;
  padding: 5px;
  width: 100%;
}

.mode-btn {
  flex: 1;
  padding: 8px 4px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease;
  white-space: nowrap;
}

.mode-btn:hover {
  color: var(--text);
  background: rgba(255,255,255,0.5);
}

.mode-btn.active {
  background: var(--surface);
  color: var(--primary);
  box-shadow: var(--shadow-sm), 2px 2px 0px rgba(61,43,31,0.1);
  font-weight: 800;
}

@media (min-width: 640px) {
  .mode-btn {
    font-size: 0.875rem;
    padding: 9px 12px;
  }
}
</style>
