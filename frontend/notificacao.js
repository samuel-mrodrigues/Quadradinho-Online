// Elemento na pagina
var notificacaoElemento = document.getElementById("notificacao")

// Task id do timeout
var taskIdAtual = 0;

// Mostrar
async function mostrarNotificacao(titulo, mensagem, tempoExibir = 5) {

    // Se tiver já mostrando alguma notificação, cancela a ultima e mostra a nova
    if (taskIdAtual != 0) {
        clearTimeout(taskIdAtual)
        ocultar();
        await new Promise((aceita, rejeitar) => {
            setTimeout(() => {
                aceita()
            }, 600);
        })
    }

    notificacaoElemento.getElementsByClassName("titulo")[0].textContent = titulo;
    notificacaoElemento.getElementsByClassName("conteudo")[0].textContent = mensagem;

    mostra()

    // Ocultar depois de x segundos
    taskIdAtual = setTimeout(() => {
        ocultar()
        taskIdAtual = 0;
    }, tempoExibir * 1000)
}

function mostra() {
    notificacaoElemento.style.display = "block"
    setTimeout(() => {
        notificacaoElemento.style.opacity = "100%"
    }, 100);
}

function ocultar() {
    notificacaoElemento.style.opacity = "0%"
    setTimeout(() => {
        notificacaoElemento.style.display = "none"
    }, 500);
}

export default { mostrarNotificacao }