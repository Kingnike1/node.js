const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Página principal - OK
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Página Inicial</h1><p>Status: 200 OK</p>');
  } else if (req.url === '/criado') {
    // Algo foi criado - Created
    res.writeHead(201, { 'Content-Type': 'text/html' });
    res.end('<h1>Recurso Criado</h1><p>Status: 201 Created</p>');
  } else if (req.url === '/proibido') {
    // Acesso proibido - Forbidden
    res.writeHead(403, { 'Content-Type': 'text/html' });
    res.end('<h1>Acesso Negado</h1><p>Status: 403 Forbidden</p>');
  } else if (req.url === '/erro') {
    // Erro interno - Internal Server Error
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('<h1>Erro Interno</h1><p>Status: 500 Internal Server Error</p>');
  } else {
    // Página não encontrada - Not Found
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Página não encontrada</h1><p>Status: 404 Not Found</p>');
  }
});

server.listen(1457, () => {
  console.log('Servidor rodando em http://localhost:1457');
});
