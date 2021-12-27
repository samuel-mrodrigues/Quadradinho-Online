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
let conexoes = [];

// Recebe uma nova conexao
servidor.on("connection", (conexao, requisicao) => {
    conectarUsuario(conexao, requisicao)
})

function conectarUsuario(conexao, requisicao) {
    console.log(`Nova conexão do IP: ${requisicao.socket.remoteAddress}`);
    // conexoes.push(conexao)
}