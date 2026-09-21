<script setup>
import { descricaoClima } from '../services/clima'

defineProps({
  dias: { type: Array, required: true },
})

// "2026-09-22" vira "terça-feira"
function diaDaSemana(data) {
  const nome = new Date(`${data}T00:00:00`).toLocaleDateString('pt-BR', { weekday: 'long' })
  return nome.charAt(0).toUpperCase() + nome.slice(1)
}

const graus = (valor) => `${Math.round(valor)}°`
</script>

<template>
  <section class="previsao">
    <h2 class="titulo">Próximos dias</h2>
    <ul class="lista">
      <li v-for="dia in dias" :key="dia.data" class="dia">
        <span class="nome">{{ diaDaSemana(dia.data) }}</span>
        <span class="condicao">{{ descricaoClima(dia.codigo) }}</span>
        <span class="chuva">{{ dia.chuva ?? 0 }}% chuva</span>
        <span class="temps">{{ graus(dia.maxima) }} <span class="min">{{ graus(dia.minima) }}</span></span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.previsao {
  border: 1px solid var(--borda);
  border-radius: 18px;
  background: var(--superficie);
  padding: 28px 24px 12px;
}

.titulo {
  margin: 0 0 8px;
  font-family: var(--fonte-titulo);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--titulo);
}

.lista {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dia {
  display: grid;
  grid-template-columns: 1.1fr 1.6fr 0.9fr 0.8fr;
  align-items: center;
  gap: 8px;
  padding: 14px 0;
  border-top: 1px solid var(--borda);
  font-size: 0.95rem;
}

.dia:first-child {
  border-top: none;
}

.nome {
  font-weight: 600;
  color: var(--titulo);
  text-align: left;
}

.condicao {
  text-align: left;
}

.chuva {
  color: var(--suave);
  font-size: 0.85rem;
}

.temps {
  font-weight: 600;
  color: var(--titulo);
  text-align: right;
}

.min {
  margin-left: 6px;
  font-weight: 400;
  color: var(--suave);
}

@media (max-width: 560px) {
  .dia {
    grid-template-columns: 1fr auto;
  }
  .condicao {
    grid-column: 1;
    grid-row: 2;
    font-size: 0.85rem;
    color: var(--suave);
  }
  .chuva {
    display: none;
  }
  .temps {
    grid-row: 1 / span 2;
    grid-column: 2;
  }
}
</style>
