import React, { useEffect, useState } from "react";

// Informação do contrato
import escola from "./contracts/escola.contract";
// Configuração para requisições na rede
import web3 from "./contracts/web3";
// Estilização
import "./style.css";
import axios from "axios";

// Verifica se o numero é menor que 10 e poe um 0 na frente
const checkZero = (val) => {
  return val < 10 ? "0" + val : val;
};
// Função que transforma time em dd/mm/yyyy hh:mm:ss
const converteHorario = (time) => {
  var date = new Date(time);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var ddmmmyyyy =
    checkZero(date.getDate()) +
    "/" +
    checkZero(date.getMonth() + 1) +
    "/" +
    date.getFullYear();
  var formattedTime =
    ddmmmyyyy +
    " " +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);

  return formattedTime;
};
function Home() {


  // Nome da escola
  const [nome_escola, setNome_escola] = useState("");
  // Cidade da escola
  const [cidade, setCidade] = useState("");
  // Média de aprovação para passar na disciplina
  const [media_aprovacao, setMedia_aprovacao] = useState();
  // Lista de alunos aprovados
  const [alunosAprovados, setAlunosAprovados] = useState([]);
  // Lista de alunos reprovados
  const [alunosReprovados, setAlunosReprovados] = useState([]);
  // Mensagem de carregando
  const [loading, setLoading] = useState(false);
  // Informação da transação
  const [transaction, setTransaction] = useState();
  // Dados da API
  const [apiData, setApiData] = useState([]);
  // Dados da API selecionado
  const [selectedApiData, setSelectedApiData] = useState("");
  // Pega dados da API
  const getDataAPI = async () => {
    try {
      // Faz requisição GET para rota da API
      const response = await axios.get("http://localhost:3333/get-data");
      // Insere dados retornados no apiData
      setApiData(response.data.data);
    } catch (error) {
      // Mostra erro
      console.log(error);
    }
  };

  // Pega informações do contrato
  const pegaInfoContrato = async () => {
    try {
      // Pega informações do contrato
      const _nome_escola = await escola.methods.nome_escola().call();
      const _cidade = await escola.methods.cidade().call();
      const _media_aprovacao = await escola.methods.media_aprovacao().call();

      setNome_escola(_nome_escola);
      setCidade(_cidade);
      setMedia_aprovacao(_media_aprovacao);

    } catch (error) {
      console.log(error);
    }
  };

  // Lista registro do contrato
  const listAlunos = async () => {
    try {
      // Chama o método do contrato que retorna registros
      const alunos_aprovados = await escola.methods.getAlunosAprovados().call();
      const alunos_reprovados = await escola.methods.getAlunosReprovados().call();

      // Insere na variável que é renderizado no gráfico
      setAlunosAprovados(alunos_aprovados);
      setAlunosReprovados(alunos_reprovados);

    } catch (error) {
      // Mostra erro
      console.log(error);
    }
  };
  // Insere registro que está cadastrado no servidor
  const insertAluno = async (e) => {
    e.preventDefault();
    try {
      // Ativa mensagem de carregamento
      setLoading(true);
      // Pega as contas do metamask
      const contas = await web3.eth.getAccounts();
      // Não existir valor no apiData não será possivel rodar essa função
      if (apiData.length === 0) throw Error("Dados do servidor não encontrado");

      const idxSelected = parseInt(selectedApiData) - 1;
      // Pega value, time e local do array apiData
      const _nome_aluno = apiData[idxSelected].nome_aluno;
      const _time = apiData[idxSelected].time;
      const _disciplina = apiData[idxSelected].disciplina;
      const _nota1 = apiData[idxSelected].nota1;
      const _nota2 = apiData[idxSelected].nota2;
      const _nota3 = apiData[idxSelected].nota3;
      const _nota4 = apiData[idxSelected].nota4;

      // Insere dados de registro
      const responseTrx = await escola.methods
        .insertAluno(_time, _nome_aluno, _disciplina, _nota1, _nota2, _nota3, _nota4)
        .send({
          // Diz a carteira que está enviando os dados
          from: contas[0],
        });
      // Mostra os dados da transação
      setTransaction(responseTrx);
      // Recarrega dados
      listAlunos();
      pegaInfoContrato();
      // pegaRegistroPerda();
      // Retira mensagem de carregando
      setLoading(false);
    } catch (error) {
      // Retira mensagem de carregando
      setLoading(false);
      // Mostra erro
      console.log(error);
    }
  };

  // Antes da página ser carregada chama as funções dentro do useEffect
  useEffect(() => {
    getDataAPI();
    pegaInfoContrato();
    listAlunos();
  }, []);

  return (
    <div>
      <h1>Sistema de notas por aluno</h1>
      <div className="divider" />
      <h2>
        Contrato:{" "}
        <a
          href={
            "https://rinkeby.etherscan.io/address/" + escola.options.address
          }
          target="_blank"
          rel="noreferrer"
        >
          {escola.options.address}
        </a>
      </h2>
      <div id="form" >
        <div className="form-div" >
          <label>Nome da escola</label>
          <input type="text" disabled value={nome_escola} /><br />

          <label>Cidade da escola</label>
          <input type="text" disabled value={cidade} /><br />

          <label>Média para aprovação</label>
          <input type="text" disabled value={media_aprovacao} /><br />
        </div>
        {/* <div className="form-div">
          <label>Destino</label>
          <input type="text" disabled value={destino} />

          <label>Condição da escola</label>
          <input
            type="text"
            disabled
            className={condicao ? "success" : "error"}
            value={condicao ? "Adequada" : "Imprópria"}
          />
        </div> */}
        {/* <div className="form-div">
          <label>Temperatura máxima</label>
          <input type="text" disabled value={tempMax} />
        </div>
        <div className="form-div">
          <label>Temperatura mínima</label>
          <input type="text" disabled value={tempMin} />
        </div> */}
      </div>
      <h2>Rendimento dos alunos:</h2>
      {/* {lostRegister && lostRegister.local ? (
        <div className="center">
          <div className="form-div3">
            <label>Temperatura</label>
            <input type="text" disabled value={lostRegister.value} />
            <label>Local</label>
            <input type="text" disabled value={lostRegister.local} />
            <label>Data</label>
            <input
              type="text"
              disabled
              value={converteHorario(parseInt(lostRegister.time))}
            />
          </div>
        </div>
      ) : (
        <h3>Nenhuma</h3>
      )} */}
      <div className="divider" />

      <br />
      <br />
      <h2>Alunos aprovados por disciplina</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Disciplina</th>
            <th>1ª nota</th>
            <th>2ª nota</th>
            <th>3ª nota</th>
            <th>4ª nota</th>
            <th>Média</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostra informação das leituras */}
          {alunosAprovados.map((regis, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{regis.nome_aluno}</td>
              <td>{regis.disciplina}</td>
              <td>{regis.nota1}</td>
              <td>{regis.nota2}</td>
              <td>{regis.nota3}</td>
              <td>{regis.nota4}</td>
              <td>{(parseInt(regis.nota1) + parseInt(regis.nota2) + parseInt(regis.nota3) + parseInt(regis.nota4)) / 4}</td>
              <td>{converteHorario(parseInt(regis.time))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!(alunosAprovados.length > 0) ? <h4>Nenhum registro no contrato</h4> : null}
      <br />
      <br />

      <br />
      <br />
      <h2>Alunos reprovados por disciplina</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Disciplina</th>
            <th>1ª nota</th>
            <th>2ª nota</th>
            <th>3ª nota</th>
            <th>4ª nota</th>
            <th>Média</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostra informação das leituras */}
          {alunosReprovados.map((regis, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{regis.nome_aluno}</td>
              <td>{regis.disciplina}</td>
              <td>{regis.nota1}</td>
              <td>{regis.nota2}</td>
              <td>{regis.nota3}</td>
              <td>{regis.nota4}</td>
              <td>{(parseInt(regis.nota1) + parseInt(regis.nota2) + parseInt(regis.nota3) + parseInt(regis.nota4)) / 4}</td>
              <td>{converteHorario(parseInt(regis.time))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!(alunosReprovados.length > 0) ? <h4>Nenhum registro no contrato</h4> : null}
      <br />
      <br />

      {
        loading ? (
          <h1>Cadastrando aluno...</h1>
        ) : transaction ? (
          <>
            {/* Mostra informação da transação  */}
            <h2>Informação da última transação</h2>
            <h3>Endereço de envio: {transaction.from}</h3>
            <h3>Endereço do Contrato: {transaction.to}</h3>
            <h3>
              <a
                href={`https://rinkeby.etherscan.io/tx/${transaction.transactionHash}`}
                target="_blank"
                rel="noreferrer"
              >
                Veja a transação no ethersan
              </a>
            </h3>
          </>
        ) : null
      }
      <br />
      <br />
      <div className="divider" />

      <h2>Dados cadastrados no servidor</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Disciplina</th>
            <th>1ª nota</th>
            <th>2ª nota</th>
            <th>3ª nota</th>
            <th>4ª nota</th>
            <th>Média</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostra informação das leituras */}
          {apiData.map((data, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{data.nome_aluno}</td>
              <td>{data.disciplina}</td>
              <td>{data.nota1}</td>
              <td>{data.nota2}</td>
              <td>{data.nota3}</td>
              <td>{data.nota4}</td>
              <td>{(data.nota1 + data.nota2 + data.nota3 + data.nota4) / 4}</td>
              <td>{converteHorario(parseInt(data.time))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!(apiData.length > 0) ? <h4>Nenhum registro no contrato</h4> : null}
      <div className="form-div2">
        <label>Selecione o id que deseja enviar para o contrato</label>
        <input
          type="text"
          value={selectedApiData}
          onChange={(e) => setSelectedApiData(e.target.value)}
        />
        <button onClick={insertAluno}>Enviar</button>
      </div>
      <br />
      <br />
    </div >
  );
}

export default Home;
