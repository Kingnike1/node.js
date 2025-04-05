

### 📄 `aprendizado-nodejs.md`

```md
# 🧠 Aprendizado de Node.js - Resumo Geral

---

## 📦 Instalação e Configuração do Node.js

- Instalamos o Node.js LTS com o Chocolatey (Windows):
  ```bash
  choco install nodejs-lts -y
  ```

- Verificação da instalação:
  ```bash
  node -v
  npm -v
  ```

---

## ⚠️ Problemas Comuns e Soluções

### 1. ❌ Comando `node` não reconhecido
- **Causa**: PATH não atualizado após instalação.
- **Solução**: Fechar e **reabrir o terminal** ou **reiniciar o computador**.

### 2. 🛑 Erro ao executar scripts no PowerShell
- **Erro**: `"A execução de scripts foi desabilitada neste sistema."`
- **Soluções**:
  - Permanente (como admin):
    ```powershell
    Set-ExecutionPolicy RemoteSigned
    ```
  - Temporária (só para a sessão):
    ```powershell
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    ```

### 3. ✅ Execução de um arquivo `.js`
- Após resolver os problemas:
  ```bash
  node myfisrt.js
  ```
  *(sim, até com erro de digitação no nome do arquivo 😄)*

---

## 🖥️ Criando um Servidor Básico com Node.js

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Olá, mundo!</h1>');
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
```

---

## 🌐 Servindo Arquivo HTML

```js
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  fs.readFile('index.html', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(3000);
```

---

## 🚀 Criando uma API com Express

### 📦 Instalação do Express
```bash
npm install express
```

### 🔁 Código de exemplo com POST:
```js
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/enviar', (req, res) => {
  const { nome, serie } = req.body;
  console.log('Recebido:', nome, serie);
  res.send('Dados recebidos com sucesso!');
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
```

---

## 💾 Conexão com Banco de Dados (MySQL)

### 📦 Instalação
```bash
npm install mysql2
```

### 🔌 Conexão e inserção de dados:
```js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'sua_base'
});

connection.connect();

app.post('/enviar', (req, res) => {
  const { nome, serie } = req.body;
  const query = 'INSERT INTO alunos (nome, serie) VALUES (?, ?)';
  connection.query(query, [nome, serie], (err, results) => {
    if (err) throw err;
    res.send('Dados inseridos!');
  });
});
```

---

## 📑 Códigos de Status HTTP

| Código | Significado              |
|--------|---------------------------|
| 200    | OK – Sucesso              |
| 201    | Created – Recurso criado |
| 403    | Forbidden – Proibido     |
| 404    | Not Found – Não encontrado |
| 500    | Internal Server Error    |

### 🧪 Exemplo prático:
```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Página Inicial - 200 OK');
  } else if (req.url === '/criado') {
    res.writeHead(201, { 'Content-Type': 'text/html' });
    res.end('Criado - 201 Created');
  } else if (req.url === '/proibido') {
    res.writeHead(403, { 'Content-Type': 'text/html' });
    res.end('Proibido - 403 Forbidden');
  } else if (req.url === '/erro') {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('Erro - 500 Internal Server Error');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('Não encontrado - 404');
  }
});

server.listen(3000);
```

---

## 🍫 Chocolatey - Gerenciador de Pacotes (Windows)

- Ferramenta para instalação de pacotes via terminal.

### 📦 Comandos úteis:
```bash
choco install nome-do-pacote
choco upgrade nome-do-pacote
```

---

## ✅ Conclusão

Você aprendeu:

- Como instalar e configurar Node.js
- Criar servidores e APIs com Node.js e Express
- Trabalhar com arquivos HTML
- Enviar e receber dados via POST
- Conectar com MySQL e realizar inserções
- Utilizar e entender códigos de status HTTP
- Resolver problemas comuns no PowerShell
- Usar o gerenciador de pacotes Chocolatey

🚀 Agora você tem uma base sólida para evoluir no desenvolvimento backend com Node.js!
```

