class Jogador {
    nome = "Não definido"
    id = -1;
    jogadorHTML;

    constructor(id, nome, jogadorHTML) {
        this.nome = nome;
        this.id = id;
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