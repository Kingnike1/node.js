const nodemailer = require('nodemailer');

// Cria o transportador (configurações do serviço de e-mail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pablo.rodrigues1@estudante.ifgoiano.edu.br', // seu endereço de e-mail
        pass: '07P05a2025', // sua senha de e-mail (atenção: isso não é seguro em produção!)
    },
});

// Define as opções do e-mail
const mailOptions = {
    from: 'pablo.rodrigues1@estudante.ifgoiano.edu.br', // endereço do remetente
    to: 'pabloalmeidathe1@gmail.com', // endereço do destinatário
    subject: 'Notificação de Envio de Arquivo', // assunto do e-mail
    html: `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Minha Página</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f2f5;
          margin: 0;
          padding: 0;
        }
        header {
          background-color: #4CAF50;
          color: white;
          padding: 20px 0;
          text-align: center;
        }
        main {
          padding: 30px;
          max-width: 800px;
          margin: auto;
          background-color: white;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          margin-top: 40px;
          border-radius: 8px;
        }
        h1 {
          margin: 0;
        }
        p {
          line-height: 1.6;
        }
        .botao {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s;
        }
        .botao:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>Bem-vindo à Minha Página</h1>
      </header>
      <main>
        <h2>Olá! Eu sou o Pablo.</h2>
        <p>Esta é uma página simples criada com HTML e CSS interno. Estou aprendendo desenvolvimento web e cada dia melhoro um pouco mais. 🚀</p>
        <p>Gosto de tecnologia, programação, e de compartilhar conhecimento com outras pessoas.</p>
        <a class="botao" href="https://www.google.com" target="_blank">Saiba mais</a>
      </main>
    </body>
    </html>
    `
    
    // text: 'Hello world?', // corpo do e-mail em texto simples (opcional)
};

// Envia o e-mail
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Ocorreu um erro ao enviar o e-mail:', error);
    } else {
        console.log('E-mail enviado com sucesso:', info.response);
    }
});

