const mysql = require("mysql");

const conexao = mysql.createConnection({
  host: "127.0.0.1",
  port: 3307,
  user: "root",
  password: "123",
});

conexao.connect((err) => {
  if (err) throw err;

  conexao.query("DROP DATABASE IF EXISTS banco_mercado", (err) => {
    if (err) throw err;
    console.log("Banco 'mydb' foi excluído com sucesso!");
    conexao.end();
  });
});
