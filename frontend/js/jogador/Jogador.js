class Jogador {
    nome = "Não definido"
    jogadorHTML;

    constructor(nome, jogadorHTML) {
        this.nome = nome;
        this.jogadorHTML = jogadorHTML

        console.log(`Jogador local: ${nome}`);
    }

    getNome() {
        return this.nome
    }

    getHTML() {
        return this.jogadorHTML;
    }

    log(msg) {
        console.log(`Jogador ${this.nome}: ${msg}`);
    }

}

export { Jogador }