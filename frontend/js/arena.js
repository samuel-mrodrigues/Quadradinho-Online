import { JogadorLocal } from "./jogador/JogadorLocal.js";
import { JogadorCliente } from "./jogador/JogadorCliente.js";

class Arena {
    // O elemeto da arena
    arenaHTML;

    // A classe do jogador
    jogadorLocal;

    // A classe dos outros jogadores
    outrosJogadores = []

    constructor() {
        this.arenaHTML = document.getElementById("arena")
    }

    getArena() {
        return this.arenaHTML
    }

    criarJogadorLocal() {
        this.jogadorLocal = new JogadorLocal(this.getArena());
    }
}
export { Arena }