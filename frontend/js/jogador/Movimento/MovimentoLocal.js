import { Movimento } from "./Movimento.js";

class MovimentoLocal extends Movimento {

    constructor(movimentoDados) {
        console.log("Montando as propriedades do movimento...");
        super(movimentoDados)
        this.ativarListenersTeclado()
    }

    // Função para escutar os inputs e mover o jogador
    ativarListenersTeclado() {
        console.log("Iniciando listeners de movimento local...");

        // Configura a movimentação do usuario
        window.onkeydown = (eventoTecla) => {
            let tecla = eventoTecla.key.toLowerCase();

            switch (tecla) {
                case "arrowup": case "w":
                    this.moverJogador("cima")
                    break;
                case "arrowright": case "d":
                    this.moverJogador("direita")
                    break;
                case "arrowdown": case "s":
                    this.moverJogador("baixo")
                    break;
                case "arrowleft": case "a":
                    this.moverJogador("esquerda")
                    break;
                default:
            }
        }

        // Mover quando o usuario dar algum input
        window.onkeyup = (eventoTecla) => {
            let tecla = eventoTecla.key.toLowerCase();

            switch (tecla) {
                case "arrowup": case "w":
                    this.pararMovimento("cima")
                    break;
                case "arrowright": case "d":
                    this.pararMovimento("direita")
                    break;
                case "arrowdown": case "s":
                    this.pararMovimento("baixo")
                    break;
                case "arrowleft": case "a":
                    this.pararMovimento("esquerda")
                    break;
                default:
            }
        }
    }
}

export { MovimentoLocal }