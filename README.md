# Clima (Vue 3)

Aplicativo de previsão do tempo feito com Vue 3 e Vite. Busca uma cidade pelo nome e mostra o clima atual e a previsão dos próximos cinco dias.

## Funcionalidades

- Busca de cidade pelo nome
- Botão para usar a localização do aparelho (só com permissão do navegador)
- Temperatura, sensação térmica, umidade e vento
- Previsão dos próximos cinco dias, com máxima, mínima e chance de chuva
- Mensagens claras para cidade não encontrada e falha de conexão
- Guarda a última cidade pesquisada no navegador
- Ícones de clima em SVG, feitos à mão, com um rostinho fofo no ícone principal
- A cor do cartão muda conforme o tempo (sol, chuva, neblina...)
- Visual claro ou escuro, conforme a configuração do aparelho

## Tecnologias

Vue 3 (Composition API com `<script setup>`), Vite, CSS puro e a API Open-Meteo.

## API

Os dados vêm da [Open-Meteo](https://open-meteo.com/), gratuita para uso não comercial e sem chave de acesso. Licença dos dados: CC BY 4.0.

## Estrutura

- `src/App.vue`: tela principal e controle do estado
- `src/components/BuscaCidade.vue`: campo de busca e botões
- `src/components/ClimaAtual.vue`: clima de agora
- `src/components/Previsao.vue`: próximos dias
- `src/components/IconeClima.vue`: ícones de clima em SVG
- `src/services/clima.js`: chamadas à API e descrição dos códigos de clima
- `src/assets/main.css`: cores, fontes e botões

## Como executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.
