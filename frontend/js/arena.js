import { JogadorLocal } from "./Jogador/JogadorLocal.js";
import { JogadorCliente } from "./Jogador/JogadorCliente.js";

import {MovimentoLocal} from "./jogador/Movimento/MovimentoLocal.js"

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

    // Cria os objeto jogador e o insere no html
    criarJogadorLocal(dados) {
        console.log("Criando o jogador local com os dados ->");
        console.log(dados);

        // Dados recebidos do servidor
        let nome = dados.jogador.nome
        let id = dados.jogador.id

        let movimentoPorPixels = dados.movimento.movimentoPorPixels
        let movimentoPorSegundo = dados.movimento.movimentoPorSegundo

        // Elemento HTML do jogador
        let jogadorElemento = document.createElement('div')
        jogadorElemento.setAttribute('id', 'jogador')

        // "Escuta" os movimentos do teclado do jogador local
        let listenerMovimento = new MovimentoLocal({
            arenaHTML: this.arenaHTML,
            jogadorHTML: jogadorElemento,
            movimentoPorPixels: movimentoPorPixels,
            movimentoPorSegundo: movimentoPorSegundo
        })

        // Instancio o jogador com os dados
         this.jogadorLocal = new JogadorLocal({
             id: id,
             nome: nome,
             html: jogadorElemento,
             movimento: listenerMovimento
         })

        // Insere no html
        this.arenaHTML.appendChild(jogadorElemento)
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
}
export { Arena }