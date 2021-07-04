// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma abicoder v2;

// Estrutura de registro
struct Aluno {
    uint64 time; // Hora do registro
    string nome_aluno; // Nome do aluno
    string disciplina; // Disciplina em questão
    int16 nota1; // 1ª nota/crédito do aluno
    int16 nota2; // 2ª nota/crédito do aluno
    int16 nota3; // 3ª nota/crédito do aluno
    int16 nota4; // 4ª nota/crédito do aluno
}

contract Escola {
    address public owner; // Proprietario do contrato
    string public nome_escola; // Nome da escola
    string public cidade; // Cidade da escola
    int256 public media_aprovacao = 7; // Média da escola (7 por padrão)

    Aluno[] public alunos_aprovados; // Lista de alunos aprovados
    Aluno[] public alunos_reprovados; // Lista de alunos reprovados

    constructor(string memory _nome_escola, string memory _cidade) {
        owner = msg.sender;
        nome_escola = _nome_escola;
        cidade = _cidade;
    }

    function insertAluno(
        uint64 _time,
        string memory _nome_aluno,
        string memory _disciplina,
        int16 _nota1,
        int16 _nota2,
        int16 _nota3,
        int16 _nota4
    ) public {
        int16 media = (_nota1 + _nota2 + _nota3 + _nota4) / 4;
        if (media >= media_aprovacao) {
            alunos_aprovados.push(
                Aluno(
                    _time,
                    _nome_aluno,
                    _disciplina,
                    _nota1,
                    _nota2,
                    _nota3,
                    _nota4
                )
            );
        } else {
            alunos_reprovados.push(
                Aluno(
                    _time,
                    _nome_aluno,
                    _disciplina,
                    _nota1,
                    _nota2,
                    _nota3,
                    _nota4
                )
            );
        }
    }

    // Retorna lista dos alunos aprovados
    function getAlunosAprovados() public view returns (Aluno[] memory _aluno) {
        return alunos_aprovados;
    }

    // Retorna lista dos alunos reprovados
    function getAlunosReprovados() public view returns (Aluno[] memory _aluno) {
        return alunos_reprovados;
    }

    // Destroi contrato
    function close() public verificaOwner {
        address payable addr = payable(msg.sender);
        selfdestruct(addr);
    }

    modifier verificaOwner() {
        require(msg.sender == owner);
        _;
    }
}
