<script setup>
import { computed } from 'vue'

const props = defineProps({
  state: { type: String, default: 'idle' },
  mode: { type: String, default: 'work' },
})

const eyeExpression = computed(() => {
  switch (props.state) {
    case 'working': return 'focused'
    case 'resting': return 'happy'
    case 'celebrating': return 'stars'
    default: return 'normal'
  }
})

const mouthExpression = computed(() => {
  switch (props.state) {
    case 'working': return 'determined'
    case 'resting': return 'smile'
    case 'celebrating': return 'open'
    default: return 'neutral'
  }
})
</script>

<template>
  <div class="mascot-wrap" :class="[`state-${state}`]" aria-hidden="true">
    <svg
      class="mascot"
      viewBox="0 0 120 140"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mascot character"
    >
      <!-- Shadow -->
      <ellipse cx="60" cy="136" rx="28" ry="6" fill="rgba(var(--text-rgb),0.12)" />

      <!-- Stem -->
      <path
        d="M58 28 C55 14 68 8 72 18"
        stroke="#6B4226"
        stroke-width="3.5"
        stroke-linecap="round"
        fill="none"
      />
      <!-- Leaf -->
      <ellipse
        cx="68"
        cy="16"
        rx="8"
        ry="5"
        fill="#4BAB8C"
        transform="rotate(-30 68 16)"
      />

      <!-- Main tomato body -->
      <circle cx="60" cy="78" r="42" fill="#E8714A" />

      <!-- Body highlight -->
      <ellipse cx="47" cy="60" rx="10" ry="14" fill="rgba(255,255,255,0.18)" transform="rotate(-15 47 60)" />

      <!-- Tomato segments -->
      <path d="M60 36 Q45 54 60 120" stroke="rgba(0,0,0,0.07)" stroke-width="2" fill="none" />
      <path d="M60 36 Q75 54 60 120" stroke="rgba(0,0,0,0.07)" stroke-width="2" fill="none" />

      <!-- Cheek blush left -->
      <ellipse cx="36" cy="82" rx="9" ry="7" fill="#F4936A" opacity="0.6" />
      <!-- Cheek blush right -->
      <ellipse cx="84" cy="82" rx="9" ry="7" fill="#F4936A" opacity="0.6" />

      <!-- EYES: normal -->
      <template v-if="eyeExpression === 'normal'">
        <ellipse cx="48" cy="72" rx="6" ry="7" fill="#3D2B1F" />
        <ellipse cx="72" cy="72" rx="6" ry="7" fill="#3D2B1F" />
        <circle cx="50" cy="70" r="2" fill="white" />
        <circle cx="74" cy="70" r="2" fill="white" />
      </template>

      <!-- EYES: focused (squinting) -->
      <template v-else-if="eyeExpression === 'focused'">
        <path d="M43 72 Q48 67 53 72" stroke="#3D2B1F" stroke-width="3" fill="none" stroke-linecap="round" />
        <path d="M67 72 Q72 67 77 72" stroke="#3D2B1F" stroke-width="3" fill="none" stroke-linecap="round" />
        <ellipse cx="48" cy="74" rx="4.5" ry="3.5" fill="#3D2B1F" />
        <ellipse cx="72" cy="74" rx="4.5" ry="3.5" fill="#3D2B1F" />
        <circle cx="50" cy="73" r="1.5" fill="white" />
        <circle cx="74" cy="73" r="1.5" fill="white" />
      </template>

      <!-- EYES: happy (closed smile) -->
      <template v-else-if="eyeExpression === 'happy'">
        <path d="M42 72 Q48 78 54 72" stroke="#3D2B1F" stroke-width="3.5" fill="none" stroke-linecap="round" />
        <path d="M66 72 Q72 78 78 72" stroke="#3D2B1F" stroke-width="3.5" fill="none" stroke-linecap="round" />
      </template>

      <!-- EYES: stars / celebrating -->
      <template v-else-if="eyeExpression === 'stars'">
        <!-- 4-pointed star left eye -->
        <path d="M42 71 L43.5 75 L47 76.5 L43.5 78 L42 82 L40.5 78 L37 76.5 L40.5 75 Z" fill="#F4A261"/>
        <!-- 4-pointed star right eye -->
        <path d="M78 71 L79.5 75 L83 76.5 L79.5 78 L78 82 L76.5 78 L73 76.5 L76.5 75 Z" fill="#F4A261"/>
      </template>

      <!-- MOUTH: neutral -->
      <template v-if="mouthExpression === 'neutral'">
        <path d="M50 92 Q60 97 70 92" stroke="#3D2B1F" stroke-width="2.5" fill="none" stroke-linecap="round" />
      </template>

      <!-- MOUTH: determined -->
      <template v-else-if="mouthExpression === 'determined'">
        <path d="M50 92 Q60 90 70 92" stroke="#3D2B1F" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <!-- sweat drop -->
        <ellipse cx="83" cy="65" rx="3.5" ry="5" fill="#7DD3FC" opacity="0.85" />
        <ellipse cx="83" cy="62" rx="1.5" ry="1.5" fill="#BAE6FD" />
      </template>

      <!-- MOUTH: smile -->
      <template v-else-if="mouthExpression === 'smile'">
        <path d="M50 90 Q60 100 70 90" stroke="#3D2B1F" stroke-width="2.5" fill="none" stroke-linecap="round" />
      </template>

      <!-- MOUTH: open celebrating -->
      <template v-else-if="mouthExpression === 'open'">
        <ellipse cx="60" cy="93" rx="10" ry="7" fill="#3D2B1F" />
        <ellipse cx="60" cy="94" rx="8" ry="5" fill="#C85A35" />
      </template>

      <!-- Arms: celebrate -->
      <template v-if="state === 'celebrating'">
        <path d="M22 75 Q10 55 18 45" stroke="#E8714A" stroke-width="9" stroke-linecap="round" fill="none" />
        <path d="M98 75 Q110 55 102 45" stroke="#E8714A" stroke-width="9" stroke-linecap="round" fill="none" />
        <!-- hands -->
        <circle cx="18" cy="44" r="7" fill="#E8714A" />
        <circle cx="102" cy="44" r="7" fill="#E8714A" />
      </template>

      <!-- Arms: resting -->
      <template v-else-if="state === 'resting'">
        <path d="M22 85 Q12 90 16 98" stroke="#E8714A" stroke-width="9" stroke-linecap="round" fill="none" />
        <path d="M98 85 Q108 90 104 98" stroke="#E8714A" stroke-width="9" stroke-linecap="round" fill="none" />
        <circle cx="16" cy="98" r="6" fill="#E8714A" />
        <circle cx="104" cy="98" r="6" fill="#E8714A" />
      </template>

      <!-- Stars for celebrating -->
      <template v-if="state === 'celebrating'">
        <!-- sparkle top-left -->
        <path d="M20 28 L21.2 32 L25 33 L21.2 34 L20 38 L18.8 34 L15 33 L18.8 32 Z" fill="#F4A261"/>
        <!-- star top-right -->
        <path d="M98 25 L99 28.5 L102.5 29.5 L99 30.5 L98 34 L97 30.5 L93.5 29.5 L97 28.5 Z" fill="#F4A261"/>
        <!-- small sparkle left -->
        <path d="M10 62 L10.8 64.5 L13.5 65 L10.8 65.5 L10 68 L9.2 65.5 L6.5 65 L9.2 64.5 Z" fill="#FBBF24"/>
        <!-- small sparkle right -->
        <path d="M108 57 L108.8 59.5 L111.5 60 L108.8 60.5 L108 63 L107.2 60.5 L104.5 60 L107.2 59.5 Z" fill="#FBBF24"/>
      </template>
    </svg>
  </div>
</template>

<style scoped>
.mascot-wrap {
  width: 110px;
  height: 130px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: -8px;
  position: relative;
  z-index: 2;
}

.mascot {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 6px 12px rgba(var(--text-rgb),0.15));
}

/* idle bounce */
.state-idle .mascot {
  animation: bounce 3s ease-in-out infinite;
}

/* working: slight sway */
.state-working .mascot {
  animation: sway 1.8s ease-in-out infinite;
}

/* resting: slow float */
.state-resting .mascot {
  animation: float 2.5s ease-in-out infinite;
}

/* celebrating: jump */
.state-celebrating .mascot {
  animation: celebrate 0.5s ease-in-out infinite alternate;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes sway {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
}

@keyframes celebrate {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-12px) scale(1.06); }
}

@media (min-width: 640px) {
  .mascot-wrap {
    width: 130px;
    height: 155px;
  }
}
</style>
