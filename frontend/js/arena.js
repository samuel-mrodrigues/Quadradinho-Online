import { JogadorLocal } from "./Jogador/JogadorLocal.js";
import { JogadorCliente } from "./Jogador/JogadorCliente.js";

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
        this.jogadorLocal = new JogadorLocal(this.getArena(), "Teste", { movimentoPorPixels: 50, movimentoPorSegundo: 0.2 });
    }

    log(msg) {
        console.log(`Arena: ${msg}`);
    }
}
export { Arena }