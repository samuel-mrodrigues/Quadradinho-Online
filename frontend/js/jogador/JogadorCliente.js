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

            console.log("Quem ta recebendo:");
            console.log(this.id, this.nome);

            // let jogadorDados = msgData.dados.quemMoveu;
            // if (jogadorDados.id == this.id) {

            //     let estaMovendo = jogadorDados.movendo;
            //     let direcao = jogadorDados.direcao;

            //     // Movendo = 1 Esta se movendo
            //     // Movendo = 0 Parou de mover
            //     if (estaMovendo == 1) {
            //         this.movimentoManager.moverJogador(direcao)
            //     } else {
            //         this.movimentoManager.pararMovimento(direcao)
            //     }
            // } else {
            //     console.log("ID NAO IGUAL");
            // }
        })
    }

}

export { JogadorCliente }