class Conexao {

    // IP websocket
    ipWebsocket;

    // Objeto WebSocket contendo a conexao
    servidorWebsocket;

    // Funções que serao chamadas ao receber msg do WebSocket
    funcoesHandlers = []

    constructor(websocketIP) {
        this.ipWebsocket = `ws://${websocketIP}`;
    }

    // Conectar ao servidor WebSocket
    conectar() {
        let esperandoConexao = new Promise((aceitar, rejeitar) => {
            this.log("Tentando conectar-se ao servidor")

            let conexaoServidor = new WebSocket(this.ipWebsocket)

            conexaoServidor.onerror = (erro) => {
                this.log("Erro ao conectar-se ao servidor!")
                rejeitar("Sem conexão com a Internet ou o servidor está offline")
            }

            conexaoServidor.onmessage = (novaMsg) => {
                this.log("Nova mensagem, passando para os listeners")
                console.log(novaMsg)

                for (let handlerFuncao of this.funcoesHandlers) {
                    handlerFuncao(novaMsg)
                }
            }

            conexaoServidor.onopen = () => {
                this.log("Conectado ao servidor!")
                this.servidorWebsocket = conexaoServidor
                aceitar(true)
            }
        })

        return esperandoConexao;
    }

    // Enviar msg ao servidor
    enviarMsg(msg) {
        this.servidorWebsocket.send(msg)
    }

    estaConectado() {
        if (this.servidorWebsocket == undefined) return false

        return this.servidorWebsocket.readyState == 1
    }

    log(msg) {
        console.log(`Servidor: ${msg}`);
    }

    // Adiciona esse listener na lista de funções a chamar
    addHandler(novaFuncao) {
        this.funcoesHandlers.push(novaFuncao)
    }
}

export { Conexao }