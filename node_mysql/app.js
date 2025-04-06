const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const PORT = 3000;

// Conexão com o banco
const conexao = mysql.createConnection({
  host: "127.0.0.1",
  port: 3307,
  user: "root",
  password: "123",
  database: "banco_mercado"
});

conexao.connect((erro) => {
  if (erro) throw erro;
  console.log("Conectado ao banco!");
});

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir a página HTML
app.get('/vendas', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'vendas.html'));
});

// Rota API que retorna dados em JSON
app.get('/api/vendas', (req, res) => {
  const sql = `
    SELECT v.idvenda, c.nome AS cliente_nome, p.nome AS produto_nome, 
           v.valor_total, v.data
    FROM tb_venda v
    INNER JOIN tb_cliente c ON v.idcliente = c.idcliente
    INNER JOIN tb_produto p ON v.idproduto = p.idproduto
  `;

  conexao.query(sql, (erro, vendas) => {
    if (erro) return res.status(500).json({ erro: "Erro ao buscar vendas." });
    res.json(vendas);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/api/tabela/:nome', (req, res) => {
    const nomeTabela = req.params.nome;
  
    const sql = `SELECT * FROM ??`; // Evita SQL injection
    conexao.query(sql, [nomeTabela], (erro, resultados) => {
      if (erro) {
        console.error("Erro ao buscar tabela:", erro);
        return res.status(500).json({ erro: "Erro ao buscar dados da tabela." });
      }
      res.json(resultados);
    });
  });