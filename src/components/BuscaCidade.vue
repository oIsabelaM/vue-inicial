<script setup>
import { ref } from 'vue'

defineProps({
  carregando: { type: Boolean, default: false },
})

const emit = defineEmits(['buscar', 'localizacao'])
const texto = ref('')

function enviar() {
  const nome = texto.value.trim()
  if (nome === '') return
  emit('buscar', nome)
}
</script>

<template>
  <form class="busca" @submit.prevent="enviar">
    <label for="cidade" class="oculto">Nome da cidade</label>
    <input
      id="cidade"
      v-model="texto"
      type="text"
      placeholder="Digite o nome de uma cidade"
      autocomplete="off"
    />
    <div class="acoes">
      <button type="submit" class="btn" :disabled="carregando">
        {{ carregando ? 'Buscando...' : 'Buscar' }}
      </button>
      <button type="button" class="btn btn-contorno" :disabled="carregando" @click="emit('localizacao')">
        Usar minha localização
      </button>
    </div>
  </form>
</template>

<style scoped>
.busca {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-bottom: 32px;
}

.busca input {
  width: 100%;
  max-width: 420px;
  padding: 14px 18px;
  border: 1px solid var(--borda-forte);
  border-radius: 10px;
  background: var(--superficie);
  color: var(--titulo);
  font: inherit;
  text-align: center;
  outline: none;
  transition: border-color 0.15s;
}

.busca input:focus {
  border-color: var(--destaque);
}

.busca input::placeholder {
  color: var(--suave);
}

.acoes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.oculto {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
