import { reactive, computed } from 'vue'

const STORAGE_KEY = 'nokimoki-settings'

const DEFAULTS = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
  alarmEnabled: true,
  alarmVolume: 0.4,
  autoStart: false,
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return { ...DEFAULTS, ...saved }
  } catch {
    return { ...DEFAULTS }
  }
}

const settings = reactive(load())

const modes = computed(() => ({
  work:  { label: 'Focus',       duration: settings.focusDuration * 60,      color: '#E8714A' },
  short: { label: 'Short Break', duration: settings.shortBreakDuration * 60, color: '#4BAB8C' },
  long:  { label: 'Long Break',  duration: settings.longBreakDuration * 60,  color: '#6B8DE8' },
}))

const CLAMP = {
  focusDuration:        v => Math.min(99, Math.max(1, parseInt(v) || 1)),
  shortBreakDuration:   v => Math.min(99, Math.max(1, parseInt(v) || 1)),
  longBreakDuration:    v => Math.min(99, Math.max(1, parseInt(v) || 1)),
  sessionsBeforeLongBreak: v => Math.min(8, Math.max(1, parseInt(v) || 1)),
  alarmVolume:          v => parseInt(v) / 100,
}

function updateSetting(key, value) {
  settings[key] = CLAMP[key] ? CLAMP[key](value) : value
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...settings }))
}

export function useSettings() {
  return { settings, modes, updateSetting }
}
