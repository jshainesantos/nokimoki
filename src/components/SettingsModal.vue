<script setup>
const props = defineProps({
  settings: { type: Object, required: true },
})
const emit = defineEmits(['close', 'update'])

function update(key, value) {
  emit('update', { key, value })
}

function onDuration(key, raw) {
  const val = Math.min(99, Math.max(1, parseInt(raw) || 1))
  update(key, val)
}

function onSessions(raw) {
  const val = Math.min(8, Math.max(1, parseInt(raw) || 1))
  update('sessionsBeforeLongBreak', val)
}
</script>

<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal" role="dialog" aria-modal="true" aria-label="Settings">
      <div class="modal-header">
        <h2 class="modal-title">Settings</h2>
        <button class="close-btn" @click="$emit('close')" aria-label="Close settings">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="sections">
        <!-- Timer Durations -->
        <section class="section">
          <h3 class="section-title">Timer Durations</h3>
          <div class="row">
            <label class="row-label">Focus</label>
            <div class="input-group">
              <input
                type="number" min="1" max="99"
                :value="settings.focusDuration"
                @change="e => onDuration('focusDuration', e.target.value)"
                class="num-input"
              />
              <span class="unit">min</span>
            </div>
          </div>
          <div class="row">
            <label class="row-label">Short Break</label>
            <div class="input-group">
              <input
                type="number" min="1" max="99"
                :value="settings.shortBreakDuration"
                @change="e => onDuration('shortBreakDuration', e.target.value)"
                class="num-input"
              />
              <span class="unit">min</span>
            </div>
          </div>
          <div class="row">
            <label class="row-label">Long Break</label>
            <div class="input-group">
              <input
                type="number" min="1" max="99"
                :value="settings.longBreakDuration"
                @change="e => onDuration('longBreakDuration', e.target.value)"
                class="num-input"
              />
              <span class="unit">min</span>
            </div>
          </div>
          <div class="row">
            <label class="row-label">Sessions before Long Break</label>
            <div class="input-group">
              <input
                type="number" min="1" max="8"
                :value="settings.sessionsBeforeLongBreak"
                @change="e => onSessions(e.target.value)"
                class="num-input"
              />
            </div>
          </div>
        </section>

        <!-- Alarm -->
        <section class="section">
          <h3 class="section-title">Alarm</h3>
          <div class="row">
            <label class="row-label">Sound</label>
            <button
              class="toggle"
              :class="{ active: settings.alarmEnabled }"
              @click="update('alarmEnabled', !settings.alarmEnabled)"
              :aria-pressed="settings.alarmEnabled"
            >
              <span class="thumb" />
            </button>
          </div>
          <div class="row" :class="{ disabled: !settings.alarmEnabled }">
            <label class="row-label">Volume</label>
            <div class="slider-group">
              <input
                type="range" min="0" max="100"
                :value="Math.round(settings.alarmVolume * 100)"
                @input="e => update('alarmVolume', parseInt(e.target.value) / 100)"
                :disabled="!settings.alarmEnabled"
                class="slider"
              />
              <span class="slider-val">{{ Math.round(settings.alarmVolume * 100) }}%</span>
            </div>
          </div>
        </section>

        <!-- Behavior -->
        <section class="section">
          <h3 class="section-title">Behavior</h3>
          <div class="row">
            <label class="row-label">Auto-start next session</label>
            <button
              class="toggle"
              :class="{ active: settings.autoStart }"
              @click="update('autoStart', !settings.autoStart)"
              :aria-pressed="settings.autoStart"
            >
              <span class="thumb" />
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(61, 43, 31, 0.35);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 0 0;
  animation: fade-in 0.2s ease;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: var(--surface);
  border-radius: 28px 28px 0 0;
  width: 100%;
  max-width: 560px;
  padding: 28px 24px 40px;
  box-shadow: 0 -8px 32px rgba(61, 43, 31, 0.15);
  animation: slide-up 0.25s ease;
  max-height: 90dvh;
  overflow-y: auto;
}

@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.modal-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text);
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-alt);
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: background 0.2s;
}

.close-btn:hover {
  background: var(--border);
}

.close-btn svg {
  width: 16px;
  height: 16px;
}

.sections {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.section-title {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  transition: opacity 0.2s;
}

.row.disabled {
  opacity: 0.4;
  pointer-events: none;
}

.row-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
}

.input-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.num-input {
  width: 60px;
  text-align: center;
  font-family: var(--font);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  background: var(--bg-alt);
  border: 2px solid var(--border);
  border-radius: 12px;
  padding: 6px 8px;
  outline: none;
  transition: border-color 0.2s;
}

.num-input:focus {
  border-color: var(--primary);
}

.num-input::-webkit-inner-spin-button,
.num-input::-webkit-outer-spin-button {
  opacity: 1;
}

.unit {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
}

/* Toggle switch */
.toggle {
  width: 48px;
  height: 28px;
  border-radius: 999px;
  background: var(--border);
  border: none;
  position: relative;
  transition: background 0.25s ease;
  flex-shrink: 0;
}

.toggle.active {
  background: var(--primary);
}

.thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  transition: transform 0.25s ease;
  display: block;
}

.toggle.active .thumb {
  transform: translateX(20px);
}

/* Slider */
.slider-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider {
  -webkit-appearance: none;
  width: 120px;
  height: 6px;
  border-radius: 999px;
  background: var(--border);
  outline: none;
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary);
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}

.slider-val {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-muted);
  min-width: 36px;
  text-align: right;
}

@media (min-width: 640px) {
  .modal {
    border-radius: 28px;
    margin-bottom: 40px;
    max-height: 80dvh;
  }

  .overlay {
    align-items: center;
  }
}
</style>
