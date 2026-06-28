<script setup>
import { ref } from 'vue'
import { useTimer, TimerRing, TimerControls, MascotCharacter, ModeSelector, SessionDots } from '@/modules/timer'
import { useSettings, SettingsModal } from '@/modules/settings'
import { IconClock, IconSettings, IconSun } from '@/components/icons'

const { settings, modes, updateSetting } = useSettings()
const {
  currentMode, isRunning,
  completedPomodoros, sessionsDone, mascotState,
  mode, progress, minutes, seconds,
  setMode, toggleTimer, resetTimer,
} = useTimer(settings, modes)

const showSettings = ref(false)

function onSettingUpdate({ key, value }) {
  updateSetting(key, value)
}
</script>

<template>
  <main class="app">
    <header class="header">
      <span class="logo-text">
        <IconClock class="logo-icon" />
        NokiMoki
      </span>
      <div class="header-right">
        <span class="streak" v-if="sessionsDone > 0" aria-label="Sessions completed today">
          {{ sessionsDone }} done today
        </span>
        <button class="settings-btn" @click="showSettings = true" aria-label="Open settings">
          <IconSettings />
        </button>
      </div>
    </header>

    <div class="content">
      <ModeSelector :current="currentMode" :modes="modes" @select="setMode" />

      <div class="timer-area">
        <MascotCharacter :state="mascotState" :mode="currentMode" />
        <TimerRing
          :progress="progress"
          :minutes="minutes"
          :seconds="seconds"
          :color="mode.color"
          :is-running="isRunning"
        />
      </div>

      <TimerControls
        :is-running="isRunning"
        @toggle="toggleTimer"
        @reset="resetTimer"
      />

      <SessionDots :completed="completedPomodoros" />

      <p class="tip" v-if="!isRunning && currentMode !== 'work'">
        Take a breather, you earned it
        <IconSun class="tip-icon" />
      </p>
    </div>
  </main>

  <SettingsModal
    v-if="showSettings"
    :settings="settings"
    @close="showSettings = false"
    @update="onSettingUpdate"
  />
</template>

<style scoped>
.app {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px 32px;
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 8px;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: -0.3px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.logo-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.settings-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-alt);
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: background 0.2s, color 0.2s;
  flex-shrink: 0;
}

.settings-btn:hover {
  background: var(--border);
  color: var(--text);
}

.settings-btn svg {
  width: 16px;
  height: 16px;
}

.streak {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  background: var(--bg-alt);
  border: 2px solid var(--border);
  border-radius: 999px;
  padding: 4px 12px;
}

.content {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding-top: 8px;
}

.timer-area {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.tip {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.tip-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .app {
    max-width: 560px;
    padding: 0 24px 48px;
  }

  .header {
    padding: 28px 0 12px;
  }

  .logo-text {
    font-size: 1.35rem;
  }

  .content {
    gap: 28px;
  }
}

@media (min-width: 1024px) {
  .app {
    max-width: 600px;
  }
}
</style>
