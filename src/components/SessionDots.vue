<script setup>
import { computed } from 'vue'
import { IconStar } from '@/components/icons'

const props = defineProps({
  completed: { type: Number, default: 0 },
})

const cycle = computed(() => props.completed % 4)
const sets = computed(() => Math.floor(props.completed / 4))
</script>

<template>
  <div class="session-wrap">
    <p class="label">Session {{ cycle + 1 }} of 4</p>
    <div class="dots" role="group" :aria-label="`${cycle} of 4 pomodoros completed in this set`">
      <span
        v-for="i in 4"
        :key="i"
        class="dot"
        :class="{ filled: i <= cycle, current: i === cycle + 1 }"
        :aria-label="i <= cycle ? 'Completed' : i === cycle + 1 ? 'Current' : 'Upcoming'"
      />
    </div>
    <p class="sets" v-if="sets > 0">
      {{ sets }} set{{ sets !== 1 ? 's' : '' }} complete
      <IconStar class="sets-icon" />
    </p>
  </div>
</template>

<style scoped>
.session-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.dots {
  display: flex;
  gap: 12px;
  align-items: center;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--border);
  border: 2.5px solid var(--border);
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  display: block;
}

.dot.filled {
  background: var(--primary);
  border-color: var(--primary-dark);
  box-shadow: 2px 2px 0px rgba(61,43,31,0.15);
}

.dot.current {
  border-color: var(--primary);
  background: var(--bg);
  transform: scale(1.2);
  box-shadow: 0 0 0 3px rgba(232, 113, 74, 0.2);
  animation: pulse-dot 1.8s ease-in-out infinite;
}

.sets {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 5px;
}

.sets-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 3px rgba(232, 113, 74, 0.2); }
  50% { box-shadow: 0 0 0 6px rgba(232, 113, 74, 0.1); }
}
</style>
