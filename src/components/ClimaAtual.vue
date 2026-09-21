<script setup>
import { computed } from 'vue'
import { descricaoClima } from '../services/clima'

const props = defineProps({
  local: { type: Object, required: true },
  atual: { type: Object, required: true },
  hoje: { type: Object, required: true },
})

// Evita repetir o nome quando a cidade e o estado são iguais (ex.: São Paulo, São Paulo)
const nomeCompleto = computed(() => {
  const { nome, regiao, pais } = props.local
  return [nome, regiao !== nome ? regiao : '', pais].filter(Boolean).join(', ')
})

const graus = (valor) => `${Math.round(valor)}°`
</script>

<template>
  <section class="atual">
    <p class="rotulo">Agora em</p>
    <h2 class="cidade">{{ nomeCompleto }}</h2>

    <p class="temperatura">{{ graus(atual.temperatura) }}</p>
    <p class="descricao">{{ descricaoClima(atual.codigo) }}</p>
    <p class="faixa">Máx. {{ graus(hoje.maxima) }} &nbsp;·&nbsp; Mín. {{ graus(hoje.minima) }}</p>

    <div class="detalhes">
      <div class="detalhe">
        <span class="detalhe-rotulo">Sensação</span>
        <span class="detalhe-valor">{{ graus(atual.sensacao) }}</span>
      </div>
      <div class="detalhe">
        <span class="detalhe-rotulo">Umidade</span>
        <span class="detalhe-valor">{{ Math.round(atual.umidade) }}%</span>
      </div>
      <div class="detalhe">
        <span class="detalhe-rotulo">Vento</span>
        <span class="detalhe-valor">{{ Math.round(atual.vento) }} km/h</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.atual {
  text-align: center;
  padding: 36px 24px;
  border: 1px solid var(--borda);
  border-radius: 18px;
  background: var(--superficie);
  margin-bottom: 24px;
}

.rotulo {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--destaque);
}

.cidade {
  margin: 6px 0 0;
  font-family: var(--fonte-titulo);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--titulo);
}

.temperatura {
  margin: 16px 0 0;
  font-family: var(--fonte-titulo);
  font-size: clamp(4.5rem, 16vw, 6.5rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--titulo);
}

.descricao {
  margin: 8px 0 0;
  font-size: 1.15rem;
}

.faixa {
  margin: 4px 0 0;
  color: var(--suave);
  font-size: 0.95rem;
}

.detalhes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 32px;
}

.detalhe {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 8px;
  border-radius: 12px;
  background: var(--destaque-suave);
}

.detalhe-rotulo {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--suave);
}

.detalhe-valor {
  font-weight: 600;
  color: var(--titulo);
}
</style>
