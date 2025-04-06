const readline = require("readline");
const { exec } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu() {
  console.log("\n========= MENU =========");
  console.log("[1] Criar banco e popular com dados");
  console.log("[2] Excluir banco de dados");
  console.log("[3] Sair");

  rl.question("\nEscolha uma opção: ", (resposta) => {
    switch (resposta) {
      case "1":
        exec("node createDb.js", (err, stdout, stderr) => {
          if (err) {
            console.error("Erro ao executar:", err);
          } else {
            console.log(stdout);
          }
          menu();
        });
        break;

      case "2":
        exec("node dropDb.js", (err, stdout, stderr) => {
          if (err) {
            console.error("Erro ao executar:", err);
          } else {
            console.log(stdout);
          }
          menu();
        });
        break;

      case "3":
        console.log("Saindo...");
        rl.close();
        break;

      default:
        console.log("Opção inválida.");
        menu();
    }
  });
}

menu();
