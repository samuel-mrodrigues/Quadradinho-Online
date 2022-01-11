import { Movimento } from "./Movimento.js";

class MovimentoCliente extends Movimento {

    constructor(movimentoDados) {
        console.log("Montando as propriedades do movimento...");
        super(movimentoDados)
    }
}

export { MovimentoCliente }