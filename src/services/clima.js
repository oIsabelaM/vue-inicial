// Funções que conversam com a API Open-Meteo (gratuita e sem chave).
// Documentação: https://open-meteo.com

const URL_CIDADES = 'https://geocoding-api.open-meteo.com/v1/search'
const URL_CLIMA = 'https://api.open-meteo.com/v1/forecast'

// Faz a requisição e troca o erro técnico do navegador por uma mensagem clara.
async function pedir(url) {
  try {
    return await fetch(url)
  } catch {
    throw new Error('Sem conexão com o serviço de clima. Verifique sua internet e tente de novo.')
  }
}

// Transforma o nome da cidade em latitude e longitude.
export async function buscarCidade(nome) {
  const url = `${URL_CIDADES}?name=${encodeURIComponent(nome)}&count=1&language=pt&format=json`
  const resposta = await pedir(url)

  if (!resposta.ok) {
    throw new Error('Não foi possível buscar a cidade. Tente novamente em instantes.')
  }

  const dados = await resposta.json()

  // Quando nada é encontrado, a API responde sem o campo "results".
  if (!dados.results || dados.results.length === 0) {
    throw new Error('Cidade não encontrada. Confira o nome e tente de novo.')
  }

  const cidade = dados.results[0]
  return {
    nome: cidade.name,
    regiao: cidade.admin1 || '',
    pais: cidade.country || '',
    latitude: cidade.latitude,
    longitude: cidade.longitude,
  }
}

// Busca o clima atual e a previsão dos próximos dias.
export async function buscarClima(latitude, longitude) {
  const parametros = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: 6, // hoje + 5 dias
  })

  const resposta = await pedir(`${URL_CLIMA}?${parametros}`)

  if (!resposta.ok) {
    throw new Error('Não foi possível carregar a previsão. Tente novamente em instantes.')
  }

  const dados = await resposta.json()

  const dias = dados.daily.time.map((data, i) => ({
    data,
    codigo: dados.daily.weather_code[i],
    maxima: dados.daily.temperature_2m_max[i],
    minima: dados.daily.temperature_2m_min[i],
    chuva: dados.daily.precipitation_probability_max[i],
  }))

  return {
    atual: {
      temperatura: dados.current.temperature_2m,
      sensacao: dados.current.apparent_temperature,
      umidade: dados.current.relative_humidity_2m,
      vento: dados.current.wind_speed_10m,
      codigo: dados.current.weather_code,
    },
    dias,
  }
}

// A API devolve um código numérico (padrão da OMM). Aqui ele vira texto.
const DESCRICOES = {
  0: 'Céu limpo',
  1: 'Predominantemente limpo',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Neblina',
  48: 'Neblina com geada',
  51: 'Garoa fraca',
  53: 'Garoa moderada',
  55: 'Garoa forte',
  56: 'Garoa congelante',
  57: 'Garoa congelante forte',
  61: 'Chuva fraca',
  63: 'Chuva moderada',
  65: 'Chuva forte',
  66: 'Chuva congelante',
  67: 'Chuva congelante forte',
  71: 'Neve fraca',
  73: 'Neve moderada',
  75: 'Neve forte',
  77: 'Grãos de neve',
  80: 'Pancadas de chuva fracas',
  81: 'Pancadas de chuva moderadas',
  82: 'Pancadas de chuva fortes',
  85: 'Pancadas de neve fracas',
  86: 'Pancadas de neve fortes',
  95: 'Tempestade',
  96: 'Tempestade com granizo',
  99: 'Tempestade com granizo forte',
}

export function descricaoClima(codigo) {
  return DESCRICOES[codigo] || 'Condição desconhecida'
}
