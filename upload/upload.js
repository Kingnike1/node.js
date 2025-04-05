const express = require("express");
const { IncomingForm } = require("formidable");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // <- aqui

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/upload", (req, res) => {
  const form = new IncomingForm({
    uploadDir: path.join(__dirname, "uploads"),
    keepExtensions: true,
    multiples: false,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Erro ao fazer parse:", err);
      return res.send("<h2>Erro no upload!</h2>");
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.send("<h2>Nenhum arquivo enviado!</h2>");
    }

    const mime = file.mimetype;
    if (!["image/jpeg", "image/png", "image/gif"].includes(mime)) {
      fs.unlink(file.filepath, () => {});
      return res.send(
        "<h2>Tipo de arquivo inválido. Envie apenas imagens.</h2>"
      );
    }

    const newPath = path.join(__dirname, "uploads", file.originalFilename);

    fs.rename(file.filepath, newPath, (err) => {
      if (err) {
        console.error("Erro ao mover arquivo:", err);
        return res.send("<h2>Erro ao salvar o arquivo.</h2>");
      }

      const imageUrl = `/uploads/${file.originalFilename}`;
      res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visualização da fotos</title>
  <style>
    body {
  font-family: 'Segoe UI', sans-serif;
  background: #f0f8ff;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.success-container {
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
  animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-container h2 {
  color: #28a745;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.success-container p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.success-container img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.success-container a {
  display: inline-block;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.success-container a:hover {
  background-color: #0056b3;
}

  </style>
</head>
<body>
  <div class="success-container">
    <h2>Upload concluído!</h2>
    <p>Arquivo: ${file.originalFilename}</p>
    <img src="${imageUrl}" alt="Imagem enviada">
    <br>
    <a href="/">Enviar outro arquivo</a>
  </div>
  
</body>
</html>

      `);
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
