import { ref, computed, onUnmounted, watch } from 'vue'
import { useAlarm } from '@/modules/timer/composables/useAlarm.js'

export function useTimer(settings, modes) {
  const { play: playAlarm } = useAlarm()
  const currentMode = ref('work')
  const timeLeft = ref(settings.focusDuration * 60)
  const isRunning = ref(false)
  const completedPomodoros = ref(0)
  const sessionsDone = ref(0)
  const mascotState = ref('idle')

  let interval = null

  const mode = computed(() => modes.value[currentMode.value])
  const progress = computed(() => 1 - timeLeft.value / mode.value.duration)
  const minutes = computed(() => String(Math.floor(timeLeft.value / 60)).padStart(2, '0'))
  const seconds = computed(() => String(timeLeft.value % 60).padStart(2, '0'))
  const cycle = computed(() => completedPomodoros.value % 4)
  const sets = computed(() => Math.floor(completedPomodoros.value / 4))

  function setMode(m) {
    if (isRunning.value) stopTimer()
    currentMode.value = m
    timeLeft.value = modes.value[m].duration
    mascotState.value = 'idle'
  }

  function startTimer() {
    isRunning.value = true
    mascotState.value = currentMode.value === 'work' ? 'working' : 'resting'
    interval = setInterval(() => {
      if (timeLeft.value <= 0) onTimerDone()
      else timeLeft.value--
    }, 1000)
  }

  function stopTimer() {
    isRunning.value = false
    mascotState.value = 'idle'
    clearInterval(interval)
    interval = null
  }

  function resetTimer() {
    stopTimer()
    timeLeft.value = mode.value.duration
    mascotState.value = 'idle'
  }

  function toggleTimer() {
    if (isRunning.value) stopTimer()
    else startTimer()
  }

  function onTimerDone() {
    stopTimer()
    mascotState.value = 'celebrating'
    playAlarm(settings)
    if ('vibrate' in navigator) navigator.vibrate([200, 100, 200])

    if (currentMode.value === 'work') {
      completedPomodoros.value++
      sessionsDone.value++
      setTimeout(() => {
        const nextMode = completedPomodoros.value % settings.sessionsBeforeLongBreak === 0 ? 'long' : 'short'
        setMode(nextMode)
        if (settings.autoStart) startTimer()
      }, 2000)
    } else {
      setTimeout(() => {
        setMode('work')
        if (settings.autoStart) startTimer()
      }, 2000)
    }
  }

  watch(currentMode, () => { timeLeft.value = mode.value.duration })

  // Sync timeLeft when duration settings change while timer is idle
  watch(() => mode.value.duration, (duration) => {
    if (!isRunning.value) timeLeft.value = duration
  })

  onUnmounted(() => clearInterval(interval))

  return {
    currentMode, timeLeft, isRunning,
    completedPomodoros, sessionsDone, mascotState,
    mode, progress, minutes, seconds, cycle, sets,
    setMode, startTimer, stopTimer, resetTimer, toggleTimer,
  }
}
