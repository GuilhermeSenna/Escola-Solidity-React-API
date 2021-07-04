# Escola-Solidity-React-API
 Projeto do 3º crédito da disciplina optativa Blockchain.

Projeto de referência: [sbcas2021](https://github.com/lifuesc/sbcas2021)

# Objetivo:

O objetivo desse projeto é cadastrar alunos e suas 4 notas/créditos nessa disciplina. Após isso, será mostrado se o aluno se enquadra na lista de alunos aprovados ou reprovados por disciplina, baseado na média dessas notas.

# Escola.sol (deploy/contracts/Escola.sol)

Contrato Solidity responsável pela criação de toda a estrutura principal.

Possui uma struct para armazenar os dados a serem recebidos pela API, que são:
- Time (timestamp)
- Nome do aluno
- Nome da disciplina 
- 4 notas nessa disciplina

Possui 2 arrays que são: 
- Lista de alunos aprovados na disciplina X. 
- Lista de alunos reprovados na disciplina X.

No método construtor são solicitados 2 parâmetros: 
- Nome da escola.
- Cidade dessa escola. 

O objetivo da função insertAluno é capturar os dados obtidos da API para aplicar a lógica para saber da aprovação ou não do aluno. Baseado na aprovação ou não ele será inserido no array de aprovação ou reprovação, respectivo ao seu desempenho na média.

As funções getAlunosAprovados e getAlunosReprovados é para uso no React.

# API (api/server.js)

A função da API é obter a partir do método POST as variáveis relativas ao aluno, a disciplina e as notas dele relativas a essa disciplina, assim como informado no Escola.sol.

# React (frontend/src/App.js <- Componente principal)

Na parte do React é feita a integração do contrato Escola.sol com a API.

É feito um listener responsável por captar as informações referidas a porta em que a API está rodando. Esse listener, a partir do JSON fornecedo pela API, mostrará uma lista de cada item adicionado nessa API. O usuário escolherá pelo ID qual deverá ser inserido para o contrato.

Após isso, com aceitação da transação no MetaMask, esses dados serão inseridos no array de acordo com a média das notas do aluno e aparecerá em sua tabela respectiva (de aprovação ou rejeição).

---

Demais detalhes técnicos e como utilizar adequadamente podem ser obtidos no projeto referência.
