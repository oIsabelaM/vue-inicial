<script setup>
import { ref, onMounted } from 'vue'
import BuscaCidade from './components/BuscaCidade.vue'
import ClimaAtual from './components/ClimaAtual.vue'
import Previsao from './components/Previsao.vue'
import { buscarCidade, buscarClima } from './services/clima'

const local = ref(null)
const clima = ref(null)
const carregando = ref(false)
const erro = ref('')

const CHAVE_SALVA = 'ultima-cidade'

// Recebe uma função que descobre o local, busca o clima e atualiza a tela.
async function carregar(obterLocal, salvar = true) {
  carregando.value = true
  erro.value = ''

  try {
    const encontrado = await obterLocal()
    clima.value = await buscarClima(encontrado.latitude, encontrado.longitude)
    local.value = encontrado

    if (salvar) {
      try {
        localStorage.setItem(CHAVE_SALVA, JSON.stringify(encontrado))
      } catch {
        // Sem armazenamento disponível: o app continua funcionando normalmente.
      }
    }
  } catch (e) {
    erro.value = e.message || 'Algo deu errado. Tente novamente.'
  } finally {
    carregando.value = false
  }
}

function pesquisar(nome) {
  carregar(() => buscarCidade(nome))
}

function usarLocalizacao() {
  if (!navigator.geolocation) {
    erro.value = 'Seu navegador não permite obter a localização.'
    return
  }

  carregando.value = true
  erro.value = ''

  navigator.geolocation.getCurrentPosition(
    (posicao) => {
      carregar(
        async () => ({
          nome: 'Sua localização',
          regiao: '',
          pais: '',
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
        }),
        false, // a localização exata não fica salva
      )
    },
    () => {
      carregando.value = false
      erro.value = 'Não foi possível acessar sua localização. Verifique a permissão do navegador.'
    },
  )
}

onMounted(() => {
  let salva = null
  try {
    salva = JSON.parse(localStorage.getItem(CHAVE_SALVA))
  } catch {
    salva = null
  }
  carregar(async () => salva || buscarCidade('São Paulo'))
})
</script>

<template>
  <main class="app">
    <header class="topo">
      <h1>Clima</h1>
      <p class="sobretitulo">Previsão do tempo para qualquer cidade</p>
    </header>

    <BuscaCidade
      :carregando="carregando"
      @buscar="pesquisar"
      @localizacao="usarLocalizacao"
    />

    <p v-if="erro" class="erro" role="alert">{{ erro }}</p>
    <p v-if="carregando && !clima" class="aviso">Buscando dados...</p>

    <template v-if="clima && local">
      <ClimaAtual :local="local" :atual="clima.atual" :hoje="clima.dias[0]" />
      <Previsao :dias="clima.dias.slice(1)" />
    </template>

    <footer class="rodape">
      <p>
        Dados meteorológicos:
        <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo.com</a>
        (licença CC BY 4.0).
      </p>
      <p>Feito com Vue 3 por Isabela.</p>
    </footer>
  </main>
</template>

<style scoped>
.app {
  max-width: 640px;
  margin: 0 auto;
  padding: 48px 20px 40px;
  text-align: center;
}

.topo {
  margin-bottom: 28px;
}

h1 {
  margin: 0;
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--titulo);
}

.sobretitulo {
  margin: 2px 0 0;
  font-size: 0.92rem;
  color: var(--suave);
}

.erro {
  margin: 0 0 24px;
  padding: 14px 18px;
  border: 1px solid var(--borda-forte);
  border-radius: 10px;
  background: var(--destaque-suave);
  color: var(--titulo);
  font-size: 0.95rem;
}

.aviso {
  color: var(--suave);
}

.rodape {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--borda);
  font-size: 0.82rem;
  color: var(--suave);
}

.rodape p {
  margin: 4px 0;
}

.rodape a {
  color: var(--texto);
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
