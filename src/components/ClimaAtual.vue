<script setup>
import { computed } from 'vue'
import { descricaoClima, grupoClima } from '../services/clima'
import IconeClima from './IconeClima.vue'

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

const grupo = computed(() => grupoClima(props.atual.codigo))
const graus = (valor) => `${Math.round(valor)}°`
</script>

<template>
  <section class="atual" :class="`grupo-${grupo}`">
    <p class="cidade">{{ nomeCompleto }}</p>

    <div class="principal">
      <IconeClima :codigo="atual.codigo" :tamanho="88" fofo />
      <p class="temperatura">{{ graus(atual.temperatura) }}</p>
    </div>

    <p class="descricao">{{ descricaoClima(atual.codigo) }}</p>
    <p class="faixa">Máx. {{ graus(hoje.maxima) }} · Mín. {{ graus(hoje.minima) }}</p>

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
      <div class="detalhe">
        <span class="detalhe-rotulo">Chuva</span>
        <span class="detalhe-valor">{{ hoje.chuva ?? 0 }}%</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.atual {
  text-align: center;
  padding: 32px 24px 28px;
  border: 1px solid var(--borda);
  border-radius: 16px;
  background: linear-gradient(180deg, var(--tom) 0%, var(--superficie) 75%);
  margin-bottom: 20px;
}

.grupo-sol { --tom: var(--tom-sol); }
.grupo-parcial { --tom: var(--tom-parcial); }
.grupo-nublado { --tom: var(--tom-nublado); }
.grupo-neblina { --tom: var(--tom-neblina); }
.grupo-chuva { --tom: var(--tom-chuva); }
.grupo-neve { --tom: var(--tom-neve); }
.grupo-tempestade { --tom: var(--tom-tempestade); }

.cidade {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--titulo);
}

.principal {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.temperatura {
  margin: 0;
  font-size: clamp(4.2rem, 15vw, 5.6rem);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--titulo);
}

.descricao {
  margin: 4px 0 0;
  font-size: 1.1rem;
  color: var(--titulo);
}

.faixa {
  margin: 2px 0 0;
  color: var(--suave);
  font-size: 0.92rem;
}

.detalhes {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 28px;
}

.detalhe {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 6px;
  border: 1px solid var(--borda);
  border-radius: 10px;
  background: var(--superficie);
}

.detalhe-rotulo {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--suave);
}

.detalhe-valor {
  font-weight: 600;
  color: var(--titulo);
  font-size: 0.95rem;
}

@media (max-width: 480px) {
  .detalhes {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
