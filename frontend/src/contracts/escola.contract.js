// importa o web3
import web3 from "./web3";
// Endereço do contrato gerado no deploy
const address = "0xc3d81472903D857E80481195A0D68aE7634D4f37";

// Abi gerada no deploy do contrato
const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_nome_escola",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_cidade",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "alunos_aprovados",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "time",
        "type": "uint64"
      },
      {
        "internalType": "string",
        "name": "nome_aluno",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "disciplina",
        "type": "string"
      },
      {
        "internalType": "int16",
        "name": "nota1",
        "type": "int16"
      },
      {
        "internalType": "int16",
        "name": "nota2",
        "type": "int16"
      },
      {
        "internalType": "int16",
        "name": "nota3",
        "type": "int16"
      },
      {
        "internalType": "int16",
        "name": "nota4",
        "type": "int16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "alunos_reprovados",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "time",
        "type": "uint64"
      },
      {
        "internalType": "string",
        "name": "nome_aluno",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "disciplina",
        "type": "string"
      },
      {
        "internalType": "int16",
        "name": "nota1",
        "type": "int16"
      },
      {
        "internalType": "int16",
        "name": "nota2",
        "type": "int16"
      },
      {
        "internalType": "int16",
        "name": "nota3",
        "type": "int16"
      },
      {
        "internalType": "int16",
        "name": "nota4",
        "type": "int16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cidade",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "close",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAlunosAprovados",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint64",
            "name": "time",
            "type": "uint64"
          },
          {
            "internalType": "string",
            "name": "nome_aluno",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "disciplina",
            "type": "string"
          },
          {
            "internalType": "int16",
            "name": "nota1",
            "type": "int16"
          },
          {
            "internalType": "int16",
            "name": "nota2",
            "type": "int16"
          },
          {
            "internalType": "int16",
            "name": "nota3",
            "type": "int16"
          },
          {
            "internalType": "int16",
            "name": "nota4",
            "type": "int16"
          }
        ],
        "internalType": "struct Aluno[]",
        "name": "_aluno",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAlunosReprovados",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint64",
            "name": "time",
            "type": "uint64"
          },
          {
            "internalType": "string",
            "name": "nome_aluno",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "disciplina",
            "type": "string"
          },
          {
            "internalType": "int16",
            "name": "nota1",
            "type": "int16"
          },
          {
            "internalType": "int16",
            "name": "nota2",
            "type": "int16"
          },
          {
            "internalType": "int16",
            "name": "nota3",
            "type": "int16"
          },
          {
            "internalType": "int16",
            "name": "nota4",
            "type": "int16"
          }
        ],
        "internalType": "struct Aluno[]",
        "name": "_aluno",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "_time",
        "type": "uint64"
      },
      {
        "internalType": "string",
        "name": "_nome_aluno",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_disciplina",
        "type": "string"
      },
      {
        "internalType": "int16",
        "name": "_nota1",
        "type": "int16"
      },
      {
        "internalType": "int16",
        "name": "_nota2",
        "type": "int16"
      },
      {
        "internalType": "int16",
        "name": "_nota3",
        "type": "int16"
      },
      {
        "internalType": "int16",
        "name": "_nota4",
        "type": "int16"
      }
    ],
    "name": "insertAluno",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "media_aprovacao",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nome_escola",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

//exporte o contrato
export default new web3.eth.Contract(abi, address);
