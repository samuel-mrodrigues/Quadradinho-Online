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

    conexao.onmessage = (msg) => {
        for (let funcaoHandler of handlers) {
            funcaoHandler(msg, conexao, requisicao)
        }
    }
})

let iniciaAutenticar = (msg, conexao, requisicaoHeader) => {
    let msgData = JSON.parse(msg.data)
    if (msgData.tipo = "iniciar-autenticacao") {
        console.log("Iniciando autenticacao de usuario!");
        let dados = msgData.dados

        console.log(`Nome do jogador: ${dados.nome}`);
        if (dados.nome.length == 0) {
            conexao.send(JSON.stringify({
                tipo: "recusa-autenticacao",
                dados: {
                    motivo: "Usuario não pode estar vazio!"
                }
            }))
            conexao.close()
            return;
        }

        conexao.send(JSON.stringify({
            tipo: "aceita-autenticacao",
        }))
    }
}

handlers.push(iniciaAutenticar)