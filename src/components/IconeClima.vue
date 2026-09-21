<script setup>
import { computed } from 'vue'
import { grupoClima } from '../services/clima'

const props = defineProps({
  codigo: { type: Number, required: true },
  tamanho: { type: Number, default: 32 },
  // Quando verdadeiro, o ícone ganha um rostinho (o detalhe fofo do app).
  fofo: { type: Boolean, default: false },
})

const grupo = computed(() => grupoClima(props.codigo))

// Posição e escala do rostinho em cada tipo de ícone.
const rosto = computed(() => {
  const posicoes = {
    sol: 'translate(32 32)',
    parcial: 'translate(38 41) scale(0.85)',
    nublado: 'translate(34 35)',
    neblina: 'translate(33.5 24.5) scale(0.8)',
    chuva: 'translate(34 31)',
    neve: 'translate(34 31)',
    tempestade: 'translate(34 31)',
  }
  return posicoes[grupo.value]
})

// Ícones pequenos precisam de um traço um pouco mais grosso para não sumirem.
const espessura = computed(() => (props.tamanho < 48 ? 3.4 : 2.5))

const CAMINHO_NUVEM =
  'M22 46h24a9 9 0 0 0 1.2-17.9A13 13 0 0 0 22.5 30 8 8 0 0 0 22 46z'
</script>

<template>
  <svg
    class="icone"
    :class="`icone-${grupo}`"
    viewBox="0 0 64 64"
    :width="tamanho"
    :height="tamanho"
    fill="none"
    :stroke-width="espessura"
    stroke-linecap="round"
    stroke-linejoin="round"
    role="img"
    aria-hidden="true"
  >
    <!-- Sol -->
    <g v-if="grupo === 'sol'" class="traco-sol">
      <circle cx="32" cy="32" r="11" />
      <path d="M32 11v5M32 48v5M11 32h5M48 32h5M17.2 17.2l3.5 3.5M43.3 43.3l3.5 3.5M17.2 46.8l3.5-3.5M43.3 20.7l3.5-3.5" />
    </g>

    <!-- Parcialmente nublado -->
    <g v-else-if="grupo === 'parcial'">
      <g class="traco-sol">
        <circle cx="24" cy="24" r="7" />
        <path d="M24 10v3M24 35v3M10 24h3M35 24h3M14.1 14.1l2.1 2.1M31.9 14.1l-2.1 2.1M14.1 33.9l2.1-2.1" />
      </g>
      <path :d="CAMINHO_NUVEM" transform="translate(12 14) scale(0.8)" class="preenchimento" />
    </g>

    <!-- Nublado -->
    <path v-else-if="grupo === 'nublado'" :d="CAMINHO_NUVEM" class="preenchimento" />

    <!-- Neblina -->
    <g v-else-if="grupo === 'neblina'">
      <path :d="CAMINHO_NUVEM" transform="translate(2 -8) scale(0.9)" class="preenchimento" />
      <path d="M14 47h36M22 55h20" />
    </g>

    <!-- Chuva -->
    <g v-else-if="grupo === 'chuva'">
      <path :d="CAMINHO_NUVEM" transform="translate(0 -4)" class="preenchimento" />
      <path d="M24 51l-2 6M32 51l-2 6M40 51l-2 6" />
    </g>

    <!-- Neve -->
    <g v-else-if="grupo === 'neve'">
      <path :d="CAMINHO_NUVEM" transform="translate(0 -4)" class="preenchimento" />
      <circle cx="24" cy="53" r="1.6" fill="currentColor" />
      <circle cx="32" cy="57" r="1.6" fill="currentColor" />
      <circle cx="40" cy="53" r="1.6" fill="currentColor" />
    </g>

    <!-- Tempestade -->
    <g v-else>
      <path :d="CAMINHO_NUVEM" transform="translate(0 -4)" class="preenchimento" />
      <path d="M34 44l-6 9h7l-5 9" />
    </g>

    <!-- Rostinho e bochechas rosadas -->
    <g v-if="fofo" :transform="rosto" class="rosto">
      <circle cx="-4.5" cy="-1.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="-1.5" r="1.5" fill="currentColor" stroke="none" />
      <path d="M-2.8 2q2.8 2.6 5.6 0" stroke-width="1.8" />
      <circle cx="-8.2" cy="2.2" r="2.3" class="bochecha" stroke="none" />
      <circle cx="8.2" cy="2.2" r="2.3" class="bochecha" stroke="none" />
    </g>
  </svg>
</template>

<style scoped>
.icone {
  stroke: var(--icone);
  color: var(--icone);
  flex-shrink: 0;
}

.traco-sol {
  stroke: var(--sol);
}

.preenchimento {
  fill: var(--superficie);
}

.rosto {
  stroke: var(--titulo);
  color: var(--titulo);
}

.bochecha {
  fill: var(--rosa);
  opacity: 0.75;
}
</style>
