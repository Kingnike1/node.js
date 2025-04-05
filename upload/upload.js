const express = require('express');
const { IncomingForm } = require('formidable');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // <- aqui

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload', (req, res) => {
  const form = new IncomingForm({
    uploadDir: path.join(__dirname, 'uploads'),
    keepExtensions: true,
    multiples: false
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Erro ao fazer parse:', err);
      return res.send('<h2>Erro no upload!</h2>');
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.send('<h2>Nenhum arquivo enviado!</h2>');
    }

    const mime = file.mimetype;
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(mime)) {
      fs.unlink(file.filepath, () => {});
      return res.send('<h2>Tipo de arquivo inválido. Envie apenas imagens.</h2>');
    }

    const newPath = path.join(__dirname, 'uploads', file.originalFilename);

    fs.rename(file.filepath, newPath, (err) => {
      if (err) {
        console.error('Erro ao mover arquivo:', err);
        return res.send('<h2>Erro ao salvar o arquivo.</h2>');
      }

      const imageUrl = `/uploads/${file.originalFilename}`;
      res.send(`
        <h2>Upload concluído!</h2>
        <p>Arquivo: ${file.originalFilename}</p>
        <img src="${imageUrl}" alt="Imagem enviada" style="max-width: 300px;">
        <br><a href="/">Enviar outro arquivo</a>
      `);
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
