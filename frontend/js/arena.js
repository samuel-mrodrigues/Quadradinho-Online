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

    mostrarArena() {
        this.arenaHTML.style.display = 'block';
        setTimeout(() => {
            this.arenaHTML.style.opacity = '100%'
        }, 2000);
    }

    ocultarArena() {
        this.arenaHTML.style.opacity = '0%'
        setTimeout(() => {
            this.arenaHTML.style.display = 'none';
        }, 2000);
    }

    log(msg) {
        console.log(`Arena: ${msg}`);
    }
}
export { Arena }