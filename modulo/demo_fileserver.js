const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Porta configurável via ambiente ou padrão 8080
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = `.${parsedUrl.pathname}`;

  // Evita acessar pastas acima do diretório atual (proteção básica)
  pathname = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');

  // Página padrão
  if (pathname === './') {
    pathname = './1-index.html'; // opcional: crie um index.html para exibir
  }

  // Verifica se o arquivo tem extensão .html
  if (path.extname(pathname) !== '.html') {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Acesso negado: apenas arquivos HTML são permitidos.');
  }

  fs.readFile(pathname, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Página não encontrada</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
