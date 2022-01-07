console.log("Iniciando backend..");

import { WebSocket, WebSocketServer } from "ws";

const servidor = new WebSocketServer({
    port: 8081,
    host: "localhost"
})

servidor.on("listening", () => {
    console.log(`Escutando novas conexões em ${servidor.address().address}:${servidor.address().port}`)
})

// Conexoes dos usuarios conectados
let jogadores = [];

// Funções a serem chamadas 
let handlers = []

// Recebe uma nova conexao
servidor.on("connection", (conexao, requisicao) => {
    console.log(`Nova conexão de ${requisicao.socket.address().address}`);

    // Abaixo, toda vez que o servidor recebe uma mensagem
    // Ele ira chamar as funções que preciso passando a mensagem recebida, a conexao do usuario e a request que contem os dados como cookies
    conexao.onmessage = (msg) => {
        for (let funcaoHandler of handlers) {
            funcaoHandler(msg, conexao, requisicao)
        }
    }

    conexao.onclose = (teste) => {
        console.log("CLOSED!");
        console.log(teste)
    }
})

function notificarTodosJogadores(msg) {
    for (let jogador of servidor.clients) {
        jogador.send(msg)
    }
}

// Funcao pra autenticar os usuarios que se conectarem

// O id abaixo aumenta cada vez que um novo user conecta
let criadorId = 0;
let iniciaAutenticar = (msg, conexao, requisicaoHeader) => {

    // A MSG vem em String, que é convertida pra JSON
    let msgData = JSON.parse(msg.data)

    // Verifica se a mensagem recebida do cliente é pra autenticar
    if (msgData.tipo = "iniciar-autenticacao") {
        console.log("Iniciando autenticacao de usuario!");
        let dados = msgData.dados

        if (dados.nome.length == 0) {
            conexao.send(JSON.stringify({
                tipo: "recusa-autenticacao",
                dados: {
                    motivo: "Usuario não pode estar vazio!"
                }
            }))
            console.log("Usuario nao setou o nome, recusando autenticacao.");
            conexao.close()
            return;
        }

        console.log(`Nome do jogador: ${dados.nome}`);
        jogadores.push({
            id: criadorId,
            nome: dados.nome,
            conexao: conexao,
            headersRequest: requisicaoHeader
        })
        criadorId++;

        console.log("Autenticação aceita, adicionando usuario ao pool de jogadores");
        conexao.send(JSON.stringify({
            tipo: "aceita-autenticacao",
            dados: {
                jogador: {
                    id: criadorId,
                    nome: dados.nome
                },
                movimento: {
                    movimentoPorPixels: 10,
                    movimentoPorSegundo: 0.2
                }
            }
        }))
    }
}

// Adiciona alguma função pra ser executada quando uma mensagem chegar
handlers.push(iniciaAutenticar)