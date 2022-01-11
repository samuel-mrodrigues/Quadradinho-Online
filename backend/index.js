console.log("Iniciando backend..");

import { WebSocket, WebSocketServer } from "ws";

const servidor = new WebSocketServer({
    port: 8081,
    host: "localhost"
})

servidor.on("listening", () => {
    console.log(`Escutando novas conexões em ${servidor.address().address}:${servidor.address().port}`)
})

// Conexoes dos usuarios conectados
let poolJogadores = [];

// Funções a serem chamadas 
let handlers = []

// Recebe uma nova conexao
servidor.on("connection", (conexao, requisicao) => {
    console.log(`Nova conexão de ${requisicao.socket.address().address}`);

    // Abaixo, toda vez que o servidor recebe uma mensagem
    // Ele ira chamar as funções que preciso passando a mensagem recebida, a conexao do usuario e a request que contem os dados como cookies
    conexao.onmessage = (msg) => {
        for (let funcaoHandler of handlers) {
            funcaoHandler(msg, conexao, requisicao)
        }
    }

    conexao.onclose = (usuarioConexao) => {
        console.log(conexao);
        console.log("Usuario desconectado!");

        if (usuarioConexao.jogadorID != undefined) {
            console.log("O usuario deslogado estava autenticado! Removendo ele da pool");


        }
    }
})

function removerJogadorPool(idJogador) {
    
}

// O id abaixo aumenta cada vez que um novo user conecta
let criadorId = 0;
// Funcao pra autenticar os usuarios que se conectarem
let iniciaAutenticar = (msg, conexao, requisicaoHeader) => {

    // A MSG vem em String, que é convertida pra JSON
    let msgData = JSON.parse(msg.data)

    // Verifica se a mensagem recebida do cliente é pra autenticar
    if (msgData.tipo != "iniciar-autenticacao") return;
    console.log(msgData);

    console.log("Iniciando autenticacao de usuario!");
    let dados = msgData.dados

    if (dados.nome.length == 0) {
        conexao.send(JSON.stringify({
            tipo: "recusa-autenticacao",
            dados: {
                motivo: "Usuario não pode estar vazio!"
            }
        }))
        console.log("Usuario nao setou o nome, recusando autenticacao.");
        conexao.close()
        return;
    }

    console.log(`Nome do jogador: ${dados.nome}`);

    // Propriedades dos movimento desse jogador que sera utilizada
    let movimento = {
        movimentoPorPixels: 15,
        movimentoPorSegundo: 0.2
    }

    // Notifica o usuario que a autenticação foi aceita
    console.log("Autenticação aceita, adicionando usuario ao pool de jogadores");
    conexao.send(JSON.stringify({
        tipo: "aceita-autenticacao",
        dados: {
            jogador: {
                id: criadorId,
                nome: dados.nome
            },
            propriedadesMovimento: movimento
        }
    }))

    // Cria um objeto que será guardado para uso futuro
    let jogadorData = {
        id: criadorId,
        nome: dados.nome,
        conexao: conexao,
        headersRequest: requisicaoHeader,
        jogo: {
            propriedadesMovimento: movimento,
            movimentoAtual: {
                cima: 0,
                direita: 0,
                baixo: 0,
                esquerda: 0
            }
        }
    }

    // Eu atribuo uma variavel no objeto do WebSocket pra identificar o ID do jogador em outras situações
    jogadorData.conexao.jogadorID = jogadorData.id

    // Adiciona na pool de jogadores
    poolJogadores.push(jogadorData)

    // Notifica os jogadores logados a atualizarem sua lista de jogadores
    notificarJogadores("atualizar-jogadores", {})

    console.log(jogadorData);

    // Aumenta o ID pro proximo jogador
    criadorId++;
}

// Manda uma mensagem para todos os jogadores
// É possivel especificar quais ids devem ser ignorados passando um array no idsIgnorar contendo os ids. Ex: [1, 3]
function notificarJogadores(tipo, dados, idsIgnorar = []) {
    for (let jogador of poolJogadores) {
        let jogadorId = jogador.id;

        if (idsIgnorar.indexOf(jogadorId) != -1) return;

        jogador.conexao.send(JSON.stringify({
            tipo: tipo,
            dados: dados
        }))
    }
}

// Envia a lista de jogadores para o jogador que autenticou
let solicitarJogadores = (msg, conexao, requisicaoHeader) => {
    // A MSG vem em String, que é convertida pra JSON
    let msgData = JSON.parse(msg.data)

    // Verifica se a mensagem recebida do cliente é pra autenticar
    if (msgData.tipo != "solicitar-jogadores") return;

    console.log(msgData);
    console.log("Nova solicitação de lista de jogadores...");

    let jogadores = []

    // Passo por cada jogador na pool de jogadores
    for (let jogador of poolJogadores) {
        let jogadorDados = {
            id: jogador.id,
            nome: jogador.nome,
            propriedadesMovimento: jogador.jogo.propriedadesMovimento
        }

        jogadores.push(jogadorDados)
    }

    // Envio a lista
    conexao.send(JSON.stringify({
        tipo: "solicitar-jogadores",
        dados: {
            jogadores: jogadores
        }
    }))
}

// Recebe os movimentos dos jogadores e notifica movimentos de volta
let jogadorMoveu = (msg, conexao, requisicaoHeader) => {
    // A MSG vem em String, que é convertida pra JSON
    let msgData = JSON.parse(msg.data)

    // Verifica se a mensagem recebida do cliente é pra autenticar
    if (msgData.tipo != "notificar-movimento") return;
    let jogadorDados = msgData.dados.jogador;

    // Atualiza o objeto do jogador que moveu
    alterarMovimento(jogadorDados.id, jogadorDados.direcao, jogadorDados.movendo);

    for (let jogador of poolJogadores) {
        jogador.conexao.send(JSON.stringify({
            tipo: "notificar-movimento",
            dados: {
                quemMoveu: {
                    id: jogadorDados.id,
                    direcao: jogadorDados.direcao,
                    movendo: jogadorDados.movendo
                }
            }
        }))
    }
}

// Altera o objeto do jogador se ele estiver movendo ou não
// É importante para que o servidor saiba o status atual de cada jogador
function alterarMovimento(idJogador, direcao, movendoOuNao) {
    for (let jogador of poolJogadores) {
        if (jogador.id == idJogador) {
            console.log(`Alterando movimentação do jogador id ${idJogador} da ${direcao} para ${movendoOuNao}`);
            jogador.jogo.movimentoAtual[direcao] = movendoOuNao;
            break;
        }
    }
}

// Adiciona alguma função pra ser executada quando uma mensagem chegar
handlers.push(iniciaAutenticar)
handlers.push(solicitarJogadores)
handlers.push(jogadorMoveu)