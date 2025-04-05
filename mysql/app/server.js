const mysql = require('mysql');

// Cria a conexão
const conexao = mysql.createConnection({
    host: 'db',      // ou 127.0.0.1
    user: 'root',           // seu usuário do MySQL
    password: '123',        // sua senha
    database: 'dond'    // coloque o nome do seu banco de dados aqui
});

// Conecta ao banco
conexao.connect(function(err) {
    if (err) {
        console.error("Erro ao conectar no banco de dados:", err.message);
        return;
    }
    console.log("✅ Conectado ao MySQL com sucesso!");
});
