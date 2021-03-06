// Importa express
const express = require("express");
// Roda configuração do express e atribui ao app
const app = express();
// Configuração de acesso a diferentes origens
const cors = require("cors");
// Porta que irá rodar o servidor
const port = 3333;

// Atribui configuração do cors no express
app.use(cors());
// Configuração para o express receber requisição json
app.use(express.json());

// Váriavel que contem as leitura
const readings = [];

// Rota de inserção de dados
app.post("/insert-data", function (req, res) {
  // Pega as variáveis no corpo da requisição
  const { nome_aluno, disciplina, nota1, nota2, nota3, nota4 } = req.body;
  try {
    const time = new Date().getTime();
    // readings.push({ value, time, local });
    // Data de inscrição, nome do aluno, 1ª nota, 2ª nota, 3ª nota, 4ª nota
    readings.push({ time, nome_aluno, disciplina, nota1, nota2, nota3, nota4 });

    // Retorna status de sucesso
    res.status(201).json({ message: "Success!" });
  } catch (error) {
    // Retorna status de erro e mostra o erro
    res.status(400).json({ message: "Error", error });
  }
});
// Rota que pega dados
app.get("/get-data", function (req, res) {
  // Retorna dados
  res.json({ data: readings });
});
// Inicia o servidor na porta
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
