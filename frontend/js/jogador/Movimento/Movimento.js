class Movimento {

    // Listeners pra eu poder customizar o que fazer quando o jogador se move
    jogadorMoveu = (direcao) => { }
    jogadorParou = (direcao) => { }

    // Total de pixels por movimento
    movimentoPorPixels = 5;

    // O total de pixels por segundo que o objeto do jogador irá se movimentar
    movimentosPorSegundo = 5;

    // Permite o movimento ou não
    habilitarMovimento = true;

    // Arena HTML onde o jogador se encontra
    arenaHTML;

    // HTML do jogador
    jogadorHTML;

    // As direcoes que estao atualmente ativas
    // Se cima, direita, etc.. estiver true(1), ele estará se movendo naquela direção, caso contrario false(0)
    movimentos = {
        cima: {
            taskId: 0,
            movendo: 0
        },
        direita: {
            taskId: 0,
            movendo: 0
        },
        baixo: {
            taskId: 0,
            movendo: 0
        },
        esquerda: {
            taskId: 0,
            movendo: 0
        }
    }

    constructor({ arenaHTML, jogadorHTML, movimentoPorPixels, movimentoPorSegundo }) {
        this.arenaHTML = arenaHTML
        this.jogadorHTML = jogadorHTML
        this.movimentoPorPixels = movimentoPorPixels
        this.movimentosPorSegundo = movimentoPorSegundo
    }

    // Mover o jogador pra uma direção
    moverJogador(direcao) {

        // Verifica se nao ta fora da area
        this.estaOutOfBonds()

        // Bloquear o movimento ou não
        if (this.habilitarMovimento == false) {
            return;
        }
        // Verifica se ja nao esta se movendo pra essa direção
        if (this.movimentos[direcao].movendo != 0) {
            return;
        }

        // ID que será gerado para uso futuro 
        let movimentoId = 0;

        // Defino que o jogador esta se movendo na direcao especificada
        this.movimentos[direcao].movendo = 1

        this.jogadorMoveu(direcao)
        switch (direcao) {
            case "cima":
                movimentoId = setInterval(() => {
                    let novaPos = this.jogadorHTML.offsetTop - this.movimentoPorPixels

                    if (novaPos < 0) {
                        let diffFimBorda = this.jogadorHTML.offsetTop - this.jogadorHTML.offsetTop
                        novaPos = diffFimBorda
                    }

                    this.jogadorHTML.style.top = `${novaPos}px`
                }, this.movimentosPorSegundo * 1000)

                this.movimentos.cima.taskId = movimentoId
                break;
            case "direita":
                movimentoId = setInterval(() => {
                    let novaPos = this.jogadorHTML.offsetLeft + this.movimentoPorPixels

                    if ((novaPos + this.jogadorHTML.offsetWidth) > this.arenaHTML.offsetWidth) {

                        let diffFimBorda = this.arenaHTML.offsetWidth - (this.jogadorHTML.offsetLeft + this.jogadorHTML.offsetWidth)
                        novaPos = this.jogadorHTML.offsetLeft + diffFimBorda
                    }

                    this.jogadorHTML.style.left = `${novaPos}px`
                }, this.movimentosPorSegundo * 1000)

                this.movimentos.direita.taskId = movimentoId
                break;
            case "baixo":
                movimentoId = setInterval(() => {
                    let novaPos = this.jogadorHTML.offsetTop + this.movimentoPorPixels

                    if ((novaPos + this.jogadorHTML.offsetHeight) > this.arenaHTML.offsetHeight) {

                        let diffFimBorda = this.arenaHTML.offsetHeight - (this.jogadorHTML.offsetHeight + this.jogadorHTML.offsetHeight)
                        novaPos = this.jogadorHTML.offsetHeight + diffFimBorda
                    }

                    this.jogadorHTML.style.top = `${novaPos}px`
                }, this.movimentosPorSegundo * 1000)

                this.movimentos.baixo.taskId = movimentoId
                break;
            case "esquerda":
                movimentoId = setInterval(() => {
                    let novaPos = this.jogadorHTML.offsetLeft - this.movimentoPorPixels

                    if (novaPos < 0) {
                        let diffFimBorda = this.jogadorHTML.offsetLeft - this.jogadorHTML.offsetLeft
                        novaPos = diffFimBorda
                    }

                    this.jogadorHTML.style.left = `${novaPos}px`
                }, this.movimentosPorSegundo * 1000)

                this.movimentos.esquerda.taskId = movimentoId
                break;
        }
    }

    // Para a task do movimento
    pararMovimento(direcao) {
        if (this.movimentos[direcao].movendo != 0) {
            clearInterval(this.movimentos[direcao].taskId)

            this.movimentos[direcao].taskId = 0;
            this.movimentos[direcao].movendo = 0
            this.jogadorParou(direcao)
        }
    }

    // Verificar se o quadrado esta dentro da arena
    estaOutOfBonds() {
        let arenaAltura = this.arenaHTML.offsetHeight
        let arenaLargura = this.arenaHTML.offsetWidth

        if ((this.jogadorHTML.offsetLeft + this.jogadorHTML.offsetWidth) > arenaLargura ||
            (this.jogadorHTML.offsetTop + this.jogadorHTML.offsetHeight) > arenaAltura) {
            this.jogadorHTML.style.top = '0px'
            this.jogadorHTML.style.left = '0px'
        }
    }
}
export { Movimento }