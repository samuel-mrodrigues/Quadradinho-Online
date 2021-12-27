import { Jogador } from "./Jogador.js"
import { MovimentoLocal } from "./Movimento/MovimentoLocal.js"

class JogadorLocal extends Jogador {
    movimentoManager;

    constructor(arenaHTML, nome, propriedadesMovimento) {
        let jogadorElemento = document.createElement('div')
        jogadorElemento.setAttribute('id', 'jogador')
        arenaHTML.appendChild(jogadorElemento)
        super(nome, jogadorElemento)

        this.log(`Pixels por movimento: ${propriedadesMovimento.movimentoPorPixels}`)
        this.log(`Movimentos por segundo: ${propriedadesMovimento.movimentoPorSegundo}`)
        
        this.movimentoManager = new MovimentoLocal({
            arenaHTML: arenaHTML,
            jogadorHTML: jogadorElemento,
            movimentoPorPixels: propriedadesMovimento.movimentoPorPixels,
            movimentoPorSegundo: propriedadesMovimento.movimentoPorSegundo
        })
    }
}

export { JogadorLocal }