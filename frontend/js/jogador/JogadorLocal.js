import { Jogador } from "./Jogador.js"

class JogadorLocal extends Jogador {
    constructor(arenaHTML, nome) {
        let jogadorElemento = document.createElement('div')
        jogadorElemento.setAttribute('id', 'jogador')
        arenaHTML.appendChild(jogadorElemento)

        super(nome, jogadorElemento)
    }
}

export { JogadorLocal }