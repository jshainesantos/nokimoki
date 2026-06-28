<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: { type: Number, default: 0 },
  minutes: { type: String, default: '25' },
  seconds: { type: String, default: '00' },
  color: { type: String, default: '#E8714A' },
  isRunning: { type: Boolean, default: false },
})

const SIZE = 260
const STROKE = 16
const R = (SIZE - STROKE) / 2
const CIRC = 2 * Math.PI * R
const dashoffset = computed(() => CIRC * (1 - props.progress))
</script>

<template>
  <div class="ring-wrap">
    <svg
      class="ring"
      :width="SIZE"
      :height="SIZE"
      :viewBox="`0 0 ${SIZE} ${SIZE}`"
      role="img"
      :aria-label="`${minutes}:${seconds} remaining`"
    >
      <!-- Track -->
      <circle
        :cx="SIZE / 2"
        :cy="SIZE / 2"
        :r="R"
        fill="none"
        stroke="var(--border)"
        :stroke-width="STROKE"
        stroke-linecap="round"
      />
      <!-- Progress arc -->
      <circle
        :cx="SIZE / 2"
        :cy="SIZE / 2"
        :r="R"
        fill="none"
        :stroke="color"
        :stroke-width="STROKE"
        stroke-linecap="round"
        :stroke-dasharray="CIRC"
        :stroke-dashoffset="dashoffset"
        transform="rotate(-90, 130, 130)"
        class="arc"
      />
    </svg>

    <!-- Inner card -->
    <div class="inner">
      <div class="time" :class="{ running: isRunning }">
        <span class="digits">{{ minutes }}</span>
        <span class="sep">:</span>
        <span class="digits">{{ seconds }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ring-wrap {
  position: relative;
  width: 260px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 16px;
}

.ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 12px rgba(var(--text-rgb),0.1));
}

.arc {
  transition: stroke-dashoffset 0.8s ease, stroke 0.4s ease;
}

.inner {
  position: relative;
  z-index: 1;
  background: var(--surface);
  border-radius: 50%;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  border: 3px solid var(--border);
}

.time {
  display: flex;
  align-items: center;
  gap: 2px;
  font-variant-numeric: tabular-nums;
}

.digits {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--text);
  line-height: 1;
  letter-spacing: -1px;
}

.sep {
  font-size: 3rem;
  font-weight: 900;
  color: var(--text-muted);
  line-height: 1;
  margin-bottom: 0;
}

.time.running .digits {
  animation: pulse-text 1s ease-in-out infinite;
}

@keyframes pulse-text {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.75; }
}

@media (min-width: 640px) {
  .ring-wrap {
    width: 300px;
    height: 300px;
  }

  .inner {
    width: 232px;
    height: 232px;
  }

  .digits {
    font-size: 4rem;
  }
}
</style>
