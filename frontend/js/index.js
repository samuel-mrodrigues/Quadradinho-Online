log("Carregando...")
// Parametros do game
let conexaoWS = "localhost:8082"

// Imports
import { Conexao } from "./conexao.js"
import { Arena } from "./arena.js"

// Variaveis
var conexaoServidor = new Conexao(conexaoWS);
var arena = new Arena()

// Criar o jogador atual e coloca-lo no gamee   
async function entrarNoJogo() {

    // Conectar-se ao servidor
    log(`Conectando-se ao servidor ${conexaoWS}`)
    let conectouSucesso;
    try {
        conectouSucesso = await conexaoServidor.conectar()
        log("Conectado!")
    } catch (erro) {
        log(erro);
        log("Erro ao estabelecer conexão com o servidor, não é possível jogar.")
    }

    if (conectouSucesso) {
        arena.criarJogadorLocal()
    }
}

entrarNoJogo()

function log(msg) {
    console.log(`Quadradinho Online: ${msg}`);
}

