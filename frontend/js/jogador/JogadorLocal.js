import { Jogador } from "./Jogador.js"

class JogadorLocal extends Jogador {

    // O movimento manager é o responsavel por saber quando o usuario se move para alguma direção
    movimentoManager;

    constructor(informacoes, conexaoServidor) {
        super(informacoes.id, informacoes.nome, informacoes.html)

        this.movimentoManager = informacoes.movimento;

        this.notificarMovimentos(conexaoServidor)
    }

    // Notificar o servidor quando o jogador se move
    notificarMovimentos(conexaoServidor) {
        console.log("Notificador de movimentos ativado..");

        this.movimentoManager.jogadorMoveu = (direcao) => {
            console.log(`Jogador movendo-se na direção ${direcao}`);

            conexaoServidor.enviarMsg(JSON.stringify({
                tipo: "notificar-movimento",
                dados: {
                    jogador: {
                        id: this.id,
                        direcao: direcao,
                        movendo: 1,
                        posicao: {
                            X: this.jogadorHTML.offsetLeft,
                            Y: this.jogadorHTML.offsetTop
                        }
                    }
                }
            }))
        }

        this.movimentoManager.jogadorParou = (direcao) => {
            console.log(`Jogador parou de se mover na direcao ${direcao}`);

            conexaoServidor.enviarMsg(JSON.stringify({
                tipo: "notificar-movimento",
                dados: {
                    jogador: {
                        id: this.id,
                        direcao: direcao,
                        movendo: 0,
                        posicao: {
                            X: this.jogadorHTML.offsetLeft,
                            Y: this.jogadorHTML.offsetTop
                        }
                    }
                }
            }))
        }
    }
}

export { JogadorLocal }