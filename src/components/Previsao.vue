<script setup>
import { descricaoClima } from '../services/clima'
import IconeClima from './IconeClima.vue'

defineProps({
  dias: { type: Array, required: true },
})

// "2026-09-22" vira "Terça-feira"
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
        <IconeClima :codigo="dia.codigo" :tamanho="34" />
        <div class="texto">
          <span class="nome">{{ diaDaSemana(dia.data) }}</span>
          <span class="condicao">{{ descricaoClima(dia.codigo) }}</span>
        </div>
        <span class="chuva">{{ dia.chuva ?? 0 }}% chuva</span>
        <span class="temps">{{ graus(dia.maxima) }} <span class="min">{{ graus(dia.minima) }}</span></span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.previsao {
  border: 1px solid var(--borda);
  border-radius: 16px;
  background: var(--superficie);
  padding: 24px 24px 8px;
}

.titulo {
  margin: 0 0 6px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--suave);
  text-align: left;
}

.lista {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dia {
  display: grid;
  grid-template-columns: 34px 1fr auto auto;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-top: 1px solid var(--borda);
}

.dia:first-child {
  border-top: none;
}

.texto {
  display: flex;
  flex-direction: column;
  text-align: left;
  line-height: 1.35;
}

.nome {
  font-weight: 600;
  color: var(--titulo);
}

.condicao {
  font-size: 0.85rem;
  color: var(--suave);
}

.chuva {
  color: var(--suave);
  font-size: 0.82rem;
  white-space: nowrap;
}

.temps {
  min-width: 78px;
  font-weight: 600;
  color: var(--titulo);
  text-align: right;
}

.min {
  margin-left: 6px;
  font-weight: 400;
  color: var(--suave);
}

@media (max-width: 480px) {
  .dia {
    grid-template-columns: 34px 1fr auto;
  }
  .chuva {
    display: none;
  }
}
</style>
