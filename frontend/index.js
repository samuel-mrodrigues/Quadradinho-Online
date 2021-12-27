log(": D")
// Parametros do game
let conexaoWS = "localhost:8081"
let taskIdCorDeFundo = 0;

// Imports
import { Conexao } from "./js/conexao.js"
import { Arena } from "./js/arena.js"

import Login from "./login.js"
import Notificacao from "./notificacao.js"

// Variaveis
var conexaoServidor = new Conexao(conexaoWS);
var arenaJogo = new Arena()

// Criar o jogador atual e coloca-lo no gamee   
async function entrarNoJogo() {
    // Conectar-se ao servidor
    log(`Conectando-se ao servidor ${conexaoWS}`)
    Notificacao.mostrarNotificacao("Iniciando conexão...", "Conectando-se ao servidor, aguarde um momento...")
    Login.travarLogin()
    let conectouSucesso;
    try {
        conectouSucesso = await conexaoServidor.conectar()
        log("Conectado!")
        Notificacao.mostrarNotificacao("Conectado", "Boas vindas : D")
    } catch (erro) {
        log(erro);
        log("Erro ao estabelecer conexão com o servidor, não é possível jogar.")
        Notificacao.mostrarNotificacao("Servidor indisponível", "Não é possivel conectar-se ao servidor ;(")
        Login.destravarLogin()
    }

    if (conectouSucesso) {
        Login.esconderLogin()

        await pausa(3)
        efeitoInicio()
        await pausa(3)
        ativarCoresDeFundo(false)
        arenaJogo.mostrarArena()
        arenaJogo.criarJogadorLocal()
    }
}

// Uns efeitinhos top
ativarCoresDeFundo(true)

// Mostrar o menu de login depois de 2s
setTimeout(() => {
    Login.mostrarLogin()

    // Quando o usuario clicar no botao da pagina de conectar, chamar a função de conexão..
    Login.clicouLogin(entrarNoJogo)
}, 2000);


function log(msg) {
    console.log(`Quadradinho Online: ${msg}`);
}

// Efeitos do inicio do jogo
function efeitoInicio() {
    document.getElementsByTagName("body")[0].style.transition = 'all 3s'
    document.getElementsByTagName("body")[0].style.backgroundColor = 'blue'
}

// Cores aleatorias de fundo
function ativarCoresDeFundo(boolean) {

    if (boolean) {
        document.getElementsByTagName("body")[0].style.transition = 'all 4s'

        taskIdCorDeFundo = setInterval(() => {
            var corAleatoria = Math.floor(Math.random() * 16777215).toString(16);
            document.getElementsByTagName("body")[0].style.backgroundColor = `#${corAleatoria}`
        }, 2000);
    } else {
        if (taskIdCorDeFundo != 0) {
            clearInterval(taskIdCorDeFundo)
            taskIdCorDeFundo = 0;
        }
        
        document.getElementsByTagName("body")[0].removeAttribute('style')
    }
}

// Pausar em algum lugar do code
async function pausa(tempoSegundos) {
    return new Promise((a, b) => {
        setTimeout(() => {
            a()
        }, tempoSegundos * 1000);
    })
}
