import { JogadorCliente } from "./jogador/JogadorCliente.js";
import { JogadorLocal } from "./Jogador/JogadorLocal.js";

import { MovimentoCliente } from "./jogador/Movimento/MovimentoCliente.js";
import { MovimentoLocal } from "./jogador/Movimento/MovimentoLocal.js"

class Arena {
    // O elemeto da arena
    arenaHTML;

    // A classe do jogador
    jogadorLocal;

    // A classe dos outros jogadores
    outrosJogadores = []

    // A classe que contem a conexao com o server
    conexaoServidor;

    constructor(servidor) {
        this.arenaHTML = document.getElementById("arena")
        this.conexaoServidor = servidor;
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

        let movimentoPorPixels = dados.propriedadesMovimento.movimentoPorPixels
        let movimentoPorSegundo = dados.propriedadesMovimento.movimentoPorSegundo

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
        }, this.conexaoServidor)

        // Insere no html
        this.arenaHTML.appendChild(jogadorElemento)
    }

    // Cria um jogador cliente e insere no HTML
    criarJogadorCliente(jogador) {
        console.log("Criando jogador cliente com os dados ->");
        console.log(jogador);

        // Dados recebidos do servidor
        let nome = jogador.nome
        let id = jogador.id

        let movimentoPorPixels = jogador.propriedadesMovimento.movimentoPorPixels
        let movimentoPorSegundo = jogador.propriedadesMovimento.movimentoPorSegundo

        // Elemento HTML do jogador
        let jogadorClienteElemento = document.createElement('div')
        jogadorClienteElemento.setAttribute('id', `jogadorCliente${id}`)

        // Listener pra saber quando esse jogador se movimenta
        let listenerMovimento = new MovimentoCliente({
            arenaHTML: this.arenaHTML,
            jogadorHTML: jogadorClienteElemento,
            movimentoPorPixels: movimentoPorPixels,
            movimentoPorSegundo: movimentoPorSegundo
        })

        // Instancio o jogador com os dados
        let jogadorCliente = new JogadorCliente({
            id: id,
            nome: nome,
            html: jogadorClienteElemento,
            movimento: listenerMovimento
        }, this.conexaoServidor)

        this.outrosJogadores.push(jogadorCliente)

        // Insere no html
        this.arenaHTML.appendChild(jogadorClienteElemento)
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