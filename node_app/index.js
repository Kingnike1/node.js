const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/sobre", (req, res) => {
  res.send("Sobre nós");
});

app.get('/contato', (req, res) => {
  res.send('Contato');
});

app.get('/usuario/:nome', (req, res) => {
  const nome = req.params.nome;
  res.send(`Olá ${nome}`);
});

app.get('/usuario/:nome/:idade/:cidade', (req, res) => {
  const { nome, idade, cidade } = req.params;
  res.send(`Olá ${nome}, você tem ${idade} anos e mora em ${cidade}`);
});

app.get('/demo', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'node_fs', 'demo.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});