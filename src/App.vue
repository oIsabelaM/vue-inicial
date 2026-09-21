<template>
  <div class="pagina">
    <div class="cartao">
      <h1>🌿 Olá, Vue!</h1>
      <p>Meu primeiro projeto com Vue.</p>
      <span class="etiqueta">vue-inicial</span>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
}

.pagina {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3faf6;
  font-family: "Segoe UI", Arial, sans-serif;
  color: #4f6b5c;
  text-align: center;
}

.cartao {
  background: #ffffff;
  padding: 40px 50px;
  border-radius: 28px;
  box-shadow: 0 8px 24px rgba(129, 199, 160, 0.3);
}

.cartao h1 {
  margin: 0 0 10px;
  color: #4a9a70;
}

.etiqueta {
  display: inline-block;
  margin-top: 10px;
  padding: 6px 16px;
  border-radius: 999px;
  background: #d6f0e0;
  color: #3d6b52;
  font-weight: 600;
}
</style>