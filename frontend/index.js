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
var arenaJogo = new Arena(conexaoServidor)

// Criar o jogador atual e coloca-lo no game
async function entrarNoJogo(nome) {

    // Conectar-se ao servidor
    log(`Conectando-se ao servidor ${conexaoWS} como ${nome}`)
    Notificacao.mostrarNotificacao("Iniciando conexão...", "Conectando-se ao servidor, aguarde um momento...")
    Login.travarLogin()
    let conectouSucesso;
    try {
        conectouSucesso = await conexaoServidor.conectar()
        log("Conectado!")
        Notificacao.mostrarNotificacao("Conectado", "Iniciando autenticação...")
    } catch (erro) {
        // Erro ao não conectar ao WS
        log(erro);
        log("Erro ao estabelecer conexão com o servidor, não é possível jogar.")
        Notificacao.mostrarNotificacao("Servidor indisponível", "Não é possivel conectar-se ao servidor ;(")
        Login.destravarLogin()
    }

    // Se conectou com sucesso
    if (conectouSucesso) {
        Notificacao.mostrarNotificacao("Autenticando", "Aguarde um momento...")

        // Receber a resposta se eu fui autenticado ou não
        conexaoServidor.addHandler(async (mensagem) => {
            let msgData = JSON.parse(mensagem.data)

            if (msgData.tipo == "recusa-autenticacao") {
                Notificacao.mostrarNotificacao("Expulso do servidor", `Motivo: ${msgData.dados.motivo}`)
                Login.destravarLogin()
                return;
            } else if (msgData.tipo == "aceita-autenticacao") {
                log("Autenticação aprovada, dados:")
                log(msgData)

                // // Esconde a barra de login
                Login.esconderLogin()
                // await pausa(3)

                // // Efeitozin inicial
                efeitoInicio()
                // await pausa(3)

                // // Ativar o pisca-pisca de fundo
                ativarCoresDeFundo(false)

                // // Mostrar arena
                arenaJogo.mostrarArena()

                // Cria o jogador local
                arenaJogo.criarJogadorLocal(msgData.dados)

                // Receber a lista de outros jogadores
                conexaoServidor.addHandler(async (mensagem) => {
                    let msgData = JSON.parse(mensagem.data)
                    if (msgData.tipo != "solicitar-jogadores") return;

                    console.log("Lista de jogadores recebida!");
                    
                    let listaJogadores = msgData.dados.jogadores

                    for (let jogador of listaJogadores) {
                        if (jogador.id == arenaJogo.jogadorLocal.id) continue;

                        arenaJogo.criarJogadorCliente(jogador)
                    }
                })

                conexaoServidor.enviarMsg(JSON.stringify({
                    tipo: "solicitar-jogadores"
                }))
            }
        })

        // Enviar solicitação pra autenticar
        conexaoServidor.enviarMsg(JSON.stringify({
            tipo: "iniciar-autenticacao",
            dados: {
                nome: nome
            }
        }))
    }
}

// Uns efeitinhos top
ativarCoresDeFundo(true)

// Mostrar o menu de login depois de 2s
setTimeout(() => {
    Login.mostrarLogin()

    // Quando o usuario clicar no botao da pagina de conectar, chamar a função de conexão..
    Login.clicouLogin(entrarNoJogo)
}, 1);


function log(msg) {
    if (typeof msg == 'string') {
        console.log(`Quadradinho Online: ${msg}`);
    } else {
        console.log("Quadradinho Online:");
        console.log(msg)
    }
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
