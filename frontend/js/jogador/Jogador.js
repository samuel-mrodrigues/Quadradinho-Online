class Jogador {
    nome = "Não definido"
    jogadorHTML;

    constructor(nome, jogadorHTML) {
        this.nome = nome;
        this.jogadorHTML = jogadorHTML
    }

    getNome() {
        return this.nome
    }

    getHTML() {
        return this.jogadorHTML;
    }
}

export { Jogador }