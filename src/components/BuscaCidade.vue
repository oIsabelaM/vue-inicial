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
    <div class="linha">
      <label for="cidade" class="oculto">Nome da cidade</label>
      <input
        id="cidade"
        v-model="texto"
        type="text"
        placeholder="Buscar cidade"
        autocomplete="off"
      />
      <button type="submit" class="btn" :disabled="carregando">
        {{ carregando ? 'Buscando...' : 'Buscar' }}
      </button>
    </div>
    <button type="button" class="btn-link" :disabled="carregando" @click="emit('localizacao')">
      Usar minha localização
    </button>
  </form>
</template>

<style scoped>
.busca {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 28px;
}

.linha {
  display: flex;
  width: 100%;
  gap: 10px;
}

.linha input {
  flex: 1;
  min-width: 0;
  padding: 12px 16px;
  border: 1px solid var(--borda-forte);
  border-radius: 10px;
  background: var(--superficie);
  color: var(--titulo);
  font: inherit;
  outline: none;
  transition: border-color 0.15s;
}

.linha input:focus {
  border-color: var(--destaque);
}

.linha input::placeholder {
  color: var(--suave);
}

.oculto {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
