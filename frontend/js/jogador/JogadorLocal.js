import { Jogador } from "./Jogador.js"

class JogadorLocal extends Jogador {

    // O movimento manager é o responsavel por saber quando o usuario se move para alguma direção
    movimentoManager;

    constructor(informacoes) {
        super(informacoes.id, informacoes.nome, informacoes.html)

        this.movimentoManager = informacoes.movimento;
    }


}

export { JogadorLocal }