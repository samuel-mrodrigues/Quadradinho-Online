import { Jogador } from "./Jogador.js"

class JogadorCliente extends Jogador {

    // O movimento manager é o responsavel por saber quando o usuario se move para alguma direção
    movimentoManager;

    constructor(informacoes, conexaoServidor) {
        super(informacoes.id, informacoes.nome, informacoes.html)

        this.movimentoManager = informacoes.movimento;
        this.receberMovimentos(conexaoServidor)
    }

    // Recebe os movimentos do servidor
    receberMovimentos(conexaoServidor) {
        console.log("Cadastrando listener de receber movimentos...");
        conexaoServidor.addHandler((mensagem) => {
            let msgData = JSON.parse(mensagem.data)
            if (msgData.tipo != "notificar-movimento") return;
            console.log(msgData);

            let jogadorDados = msgData.dados.quemMoveu;
            console.log("Quem moveu:");
            console.log(jogadorDados);
            console.log("Quem ta recebendo:");
            console.log(this.id, this.nome);

            if (jogadorDados.id == this.id) {
                let estaMovendo = jogadorDados.movendo;
                let direcao = jogadorDados.direcao;

                console.log(`Preciso mover o player id ${this.id} na direcao ${direcao}!`);

                if (estaMovendo) {
                    this.movimentoManager.moverJogador(direcao)
                } else {
                    this.movimentoManager.pararMovimento(direcao)
                }
            }
        })
    }

}

export { JogadorCliente }