//----------------------------------------------------- Movimento
// Quais direções o jogador esta se movimento
let movimentos = {
    cima: 0,
    direita: 0,
    baixo: 0,
    esquerda: 0
}

// Total de pixels por movimento
var totalMovimentoPixels = 5

// O total de pixels por segundo que o objeto do jogador irá se movimentar
var pixelsPorSegundo = 500;

// Permite o movimento ou não
let habilitarMovimento = true;

// Referencia do objeto HTML do jogador
let jogador;

// Area onde se encontra os jogadores
let area;

// Configurar
function configurar(dados = {
    areaObjeto,
    movimentoPixeis,
    pixelsPorSegundo,
    jogadorObjeto
}) {
    totalMovimentoPixels = dados.movimentoPixeis;
    pixelsPorSegundo = dados.pixelsPorSegundo
    jogador = dados.jogadorObjeto;
    area = dados.areaObjeto

    console.log(`Configurando o movimento com os seguintes dados:`);
    console.log(`Pixels por movimento: ${totalMovimentoPixels}`);
    console.log(`Movimento por segundo: ${pixelsPorSegundo}`);
    console.log(`Area objeto: `);
    console.log(area);
    console.log(`Jogador objeto: `);
    console.log(jogador);
}

// Função para escutar os inputs e mover o jogador
function listenerMovimentos() {
    console.log("Iniciando listeners de movimento...");

    // Configura a movimentação do usuario
    window.onkeydown = (eventoTecla) => {
        let tecla = eventoTecla.key.toLowerCase();

        switch (tecla) {
            case "arrowup": case "w":
                moverJogador("cima")
                break;
            case "arrowright": case "d":
                moverJogador("direita")
                break;
            case "arrowdown": case "s":
                moverJogador("baixo")
                break;
            case "arrowleft": case "a":
                moverJogador("esquerda")
                break;
            default:
        }
    }

    // Mover quando o usuario dar algum input
    window.onkeyup = (eventoTecla) => {
        let tecla = eventoTecla.key.toLowerCase();

        switch (tecla) {
            case "arrowup": case "w":
                pararMovimento("cima")
                break;
            case "arrowright": case "d":
                pararMovimento("direita")
                break;
            case "arrowdown": case "s":
                pararMovimento("baixo")
                break;
            case "arrowleft": case "a":
                pararMovimento("esquerda")
                break;
            default:
        }
    }
}

function moverJogador(direcao) {
    estaOutOfBonds()

    if (movimentos[direcao] != 0) {
        return;
    }

    if (habilitarMovimento == false) {
        return;
    }

    let movimentoId = 0;

    switch (direcao) {
        case "cima":
            movimentoId = setInterval(() => {
                let novaPos = jogador.offsetTop - totalMovimentoPixels

                if (novaPos < 0) {
                    let diffFimBorda = jogador.offsetTop - jogador.offsetTop
                    novaPos = diffFimBorda
                }

                jogador.style.top = `${novaPos}px`
            }, pixelsPorSegundo * 1000)

            movimentos.cima = movimentoId
            break;
        case "direita":
            movimentoId = setInterval(() => {
                let novaPos = jogador.offsetLeft + totalMovimentoPixels

                if ((novaPos + jogador.offsetWidth) > area.offsetWidth) {

                    let diffFimBorda = area.offsetWidth - (jogador.offsetLeft + jogador.offsetWidth)
                    novaPos = jogador.offsetLeft + diffFimBorda
                }

                jogador.style.left = `${novaPos}px`
            }, pixelsPorSegundo * 1000)

            movimentos.direita = movimentoId
            break;
        case "baixo":
            movimentoId = setInterval(() => {
                let novaPos = jogador.offsetTop + totalMovimentoPixels

                if ((novaPos + jogador.offsetHeight) > area.offsetHeight) {

                    let diffFimBorda = area.offsetHeight - (jogador.offsetHeight + jogador.offsetHeight)
                    novaPos = jogador.offsetHeight + diffFimBorda
                }

                jogador.style.top = `${novaPos}px`
            }, pixelsPorSegundo * 1000)

            movimentos.baixo = movimentoId
            break;
        case "esquerda":
            movimentoId = setInterval(() => {
                let novaPos = jogador.offsetLeft - totalMovimentoPixels

                if (novaPos < 0) {
                    let diffFimBorda = jogador.offsetLeft - jogador.offsetLeft
                    novaPos = diffFimBorda
                }

                jogador.style.left = `${novaPos}px`
            }, pixelsPorSegundo * 1000)

            movimentos.esquerda = movimentoId
            break;
    }
}

function pararMovimento(direcao) {
    if (movimentos[direcao] != 0) {
        console.log(`Jogador parou de ir pra ${direcao}, parando movimento...`);
        clearInterval(movimentos[direcao])
        movimentos[direcao] = 0
    }
}

function estaOutOfBonds() {
    let arenaAltura = area.offsetHeight
    let arenaLargura = area.offsetWidth

    if ((jogador.offsetLeft + jogador.offsetWidth) > arenaLargura ||
        (jogador.offsetTop + jogador.offsetHeight) > arenaAltura) {
        jogador.style.top = '0px'
        jogador.style.left = '0px'
    }
}

export default { configurar, listenerMovimentos }