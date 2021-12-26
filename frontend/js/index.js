console.log("Carregando arquivos...");

// Trata do movimento de jogadores
import MovimentoManager from "./movimento.js"

// Referencias globais
var jogador = document.getElementById("jogador")
var area = document.getElementById("area")


// Configurações iniciais
// Iniciar o listener pra mover os jogadores
console.log("-------------");
MovimentoManager.configurar({ areaObjeto: area, jogadorObjeto: jogador, movimentoPixeis: 30, pixelsPorSegundo: 0 })
MovimentoManager.listenerMovimentos()
console.log("-------------");