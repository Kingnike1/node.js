// Importa o módulo Express para criar o servidor web
const express = require('express');

// Importa o módulo path, que fornece utilitários para trabalhar com caminhos de arquivos e diretórios
const path = require('path');

// Cria uma instância do Express
const app = express();

// Define a porta em que o servidor vai escutar
const port = 3000;

// Define uma rota para o caminho raiz "/"
app.get('/', (req, res) => {
  // Cria um caminho absoluto para o arquivo "arquivo.txt" no mesmo diretório do script
  const exemploPath = path.join(__dirname, 'arquivo.txt');

  // Cria um objeto com vários exemplos de uso do módulo "path"
  const resultados = {
    // Caminho completo para "arquivo.txt"
    caminho_exemplo: exemploPath,

    // Retorna o nome do arquivo (basename)
    basename: path.basename(exemploPath),

    // Retorna apenas o diretório do caminho
    dirname: path.dirname(exemploPath),

    // Retorna a extensão do arquivo
    extname: path.extname(exemploPath),

    // Junta caminhos em um único path, tratando separadores automaticamente
    join: path.join('pasta', 'subpasta', 'arquivo.txt'),

    // Resolve um caminho absoluto com base nas partes fornecidas
    resolve: path.resolve('pasta', 'arquivo.txt'),

    // Normaliza o caminho, corrigindo duplicação de barras e diretórios desnecessários (..)
    normalize: path.normalize('pasta//subpasta/../arquivo.txt'),

    // Retorna um objeto com as partes do caminho (raiz, dir, base, ext, name)
    parse: path.parse(exemploPath),

    // Formata um objeto de caminho em uma string de caminho completa
    format: path.format({ dir: __dirname, base: 'arquivo.txt' }),

    // Verifica se o caminho é absoluto (deve retornar true)
    isAbsolute_true: path.isAbsolute(exemploPath),

    // Verifica se um caminho relativo é absoluto (deve retornar false)
    isAbsolute_false: path.isAbsolute('docs/arquivo.txt'),

    // Retorna o separador de diretório usado no sistema (ex: / ou \)
    sep: path.sep,

    // Retorna o delimitador usado para variáveis de ambiente PATH (ex: ; no Windows, : no Unix)
    delimiter: path.delimiter,
  };

  // Cria uma string HTML para exibir os resultados no navegador
  let html = `<h1>Exemplos do módulo path</h1><ul>`;
  for (let chave in resultados) {
    html += `<li><strong>${chave}:</strong> ${JSON.stringify(resultados[chave])}</li>`;
  }
  html += `</ul>`;

  // Envia o HTML como resposta ao navegador
  res.send(html);
});

// Inicia o servidor e exibe no console que ele está rodando
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
