const mysql = require("mysql");

const conexao = mysql.createConnection({
  host: "127.0.0.1",
  port: 3307,
  user: "root",
  password: "123",
});

conexao.connect((erro) => {
  if (erro) throw erro;
  console.log("Conectado ao MySQL!");

  const criarBanco = `
    CREATE SCHEMA IF NOT EXISTS banco_mercado DEFAULT CHARACTER SET utf8mb4;
  `;

  conexao.query(criarBanco, (erro) => {
    if (erro) throw erro;
    console.log("Banco de dados criado!");

    conexao.query("USE banco_mercado", (erro) => {
      if (erro) throw erro;

      const tabelas = {
        cliente: `
          CREATE TABLE IF NOT EXISTS tb_cliente (
            idcliente INT NOT NULL AUTO_INCREMENT,
            nome VARCHAR(80) NOT NULL,
            cpf VARCHAR(14) NOT NULL,
            endereco VARCHAR(100),
            PRIMARY KEY (idcliente)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `,
        produto: `
          CREATE TABLE IF NOT EXISTS tb_produto (
            idproduto INT NOT NULL AUTO_INCREMENT,
            nome VARCHAR(120) NOT NULL,
            tipo VARCHAR(45) NOT NULL,
            preco_compra DECIMAL(10,2) NOT NULL,
            preco_venda DECIMAL(10,2),
            margem_lucro DECIMAL(10,2),
            quantidade DECIMAL(10,3) NOT NULL,
            PRIMARY KEY (idproduto)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `,
        usuario: `
          CREATE TABLE IF NOT EXISTS tb_usuario (
            idusuario INT NOT NULL AUTO_INCREMENT,
            nome VARCHAR(80) NOT NULL,
            email VARCHAR(120) NOT NULL,
            senha VARCHAR(200) NOT NULL,
            PRIMARY KEY (idusuario),
            UNIQUE (email)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `,
        venda: `
          CREATE TABLE IF NOT EXISTS tb_venda (
            idvenda INT NOT NULL AUTO_INCREMENT,
            idcliente INT NOT NULL,
            idproduto INT NOT NULL,
            valor_total DECIMAL(10,2),
            data DATE,
            PRIMARY KEY (idvenda),
            FOREIGN KEY (idcliente) REFERENCES tb_cliente(idcliente)
              ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (idproduto) REFERENCES tb_produto(idproduto)
              ON DELETE CASCADE ON UPDATE CASCADE
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `,
      };

      // Criar tabelas
      conexao.query(tabelas.cliente, (erro) => {
        if (erro) throw erro;
        conexao.query(tabelas.produto, (erro) => {
          if (erro) throw erro;
          conexao.query(tabelas.usuario, (erro) => {
            if (erro) throw erro;
            conexao.query(tabelas.venda, (erro) => {
              if (erro) throw erro;

              // Inserir dados
              inserirDados();
            });
          });
        });
      });
    });
  });
});

function inserirDados() {
  const insertCliente = `
    INSERT INTO tb_cliente (nome, cpf, endereco) VALUES ?
  `;
  const valoresCliente = [
    ["João Silva", "123.456.789-01", "Rua das Flores, 100 - Centro"],
    ["Maria Oliveira", "987.654.321-09", "Av. Principal, 500 - Jardins"],
    ["Carlos Souza", "456.789.123-45", "Travessa das Palmeiras, 25"],
    ["Ana Pereira", "321.654.987-32", "Rua dos Coqueiros, 77 - Praia"],
  ];

  conexao.query(insertCliente, [valoresCliente], (erro) => {
    if (erro) throw erro;

    const insertProduto = `
      INSERT INTO tb_produto (nome, tipo, preco_compra, preco_venda, margem_lucro, quantidade) VALUES ?
    `;
    const valoresProduto = [
      ["Produto 1", "Alimento", 10.99, null, null, 100],
      ["Produto 2", "Limpeza", 5.99, null, null, 50],
      ["Produto 3", "Higiene", 8.99, null, null, 75],
      ["Produto 4", "Limpeza", 6.99, null, null, 80],
      ["Produto 5", "Alimento", 9.99, null, null, 120],
      ["Produto 6", "Higiene", 7.99, null, null, 90],
      ["Produto 7", "Alimento", 11.99, null, null, 150],
      ["Produto 8", "Limpeza", 4.99, null, null, 60],
    ];
    conexao.query(insertProduto, [valoresProduto], (erro) => {
      if (erro) throw erro;

      const insertUsuario = `
        INSERT INTO tb_usuario (nome, email, senha) VALUES ?
      `;
      const valoresUsuario = [
        ["João Silva", "joao@example.com", "senha123"],
        ["Maria Oliveira", "maria@example.com", "senha456"],
        ["Carlos Souza", "carlos@example.com", "senha789"],
        ["Ana Pereira", "ana@example.com", "senha987"],
      ];
      conexao.query(insertUsuario, [valoresUsuario], (erro) => {
        if (erro) throw erro;

        const insertVenda = `
          INSERT INTO tb_venda (idcliente, idproduto, valor_total, data) VALUES ?
        `;
        const valoresVenda = [
          [1, 1, 10.99, "2023-06-01"],
          [2, 2, 5.99, "2023-06-02"],
          [3, 3, 8.99, "2023-06-03"],
          [4, 4, 6.99, "2023-06-04"],
          [1, 5, 9.99, "2023-06-05"],
          [2, 6, 7.99, "2023-06-06"],
          [3, 7, 11.99, "2023-06-07"],
          [4, 8, 4.99, "2023-06-08"],
        ];
        conexao.query(insertVenda, [valoresVenda], (erro) => {
          if (erro) throw erro;

          listarVendas();
        });
      });
    });
  });
}

function listarVendas() {
  const sql = `
    SELECT v.idvenda, c.nome AS cliente_nome, p.nome AS produto_nome, 
           v.valor_total, v.data
    FROM tb_venda v
    INNER JOIN tb_cliente c ON v.idcliente = c.idcliente
    INNER JOIN tb_produto p ON v.idproduto = p.idproduto
  `;

  conexao.query(sql, (erro, vendas) => {
    if (erro) throw erro;

    console.log("\n--- Lista de Vendas ---");
    console.table(vendas);

    conexao.end((erro) => {
      if (erro) throw erro;
      console.log("Conexão encerrada.");
    });
  });
}
