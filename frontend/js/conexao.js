class Conexao {

    // IP websocket
    ipWebsocket;

    // Objeto WebSocket contendo a conexao
    servidorWebsocket;

    constructor(websocketIP) {
        this.ipWebsocket = `ws://${websocketIP}`;
    }

    // Conectar ao servidor WebSocket
    conectar() {
        let esperandoConexao = new Promise((aceitar, rejeitar) => {
            this.log("Tentando conectar-se ao servidor")

            let conexaoServidor = new WebSocket(this.ipWebsocket)

            conexaoServidor.onopen = () => {
                this.log("Conectado ao servidor!")
                this.servidorWebsocket = conexaoServidor
                aceitar(true)
            }

            conexaoServidor.onerror = (erro) => {
                this.log("Erro ao conectar-se ao servidor!")
                rejeitar("Sem conexão com a Internet ou o servidor está offline")
            }
        })

        return esperandoConexao;
    }

    estaConectado() {
        if (this.servidorWebsocket == undefined) return false

        return this.servidorWebsocket.readyState == 1
    }

    log(msg) {
        console.log(`Servidor: ${msg}`);
    }
}

export { Conexao }