// Elementos da pagina
let loginElemento = document.getElementById("login")
let botaoLogin = loginElemento.getElementsByClassName("entrar")[0];

// Destrava os campos
function destravarLogin() {
    loginElemento.classList.remove("bloqueado")
    loginElemento.getElementsByClassName("resposta")[0].removeAttribute('disabled')
    botaoLogin.removeAttribute('disabled')
}

// Trava
function travarLogin() {
    loginElemento.classList.add("bloqueado")
    loginElemento.getElementsByClassName("resposta")[0].setAttribute('disabled', 1)
    botaoLogin.setAttribute('disabled', 1)
}

function esconderLogin() {
    ativarEfeitosLoucos(false)

    loginElemento.style.transition = 'all 1s'
    loginElemento.style.fontSize = '1px'
    loginElemento.style.transition = 'all 3s'

    setTimeout(() => {
        loginElemento.style.opacity = '0%'
    }, 1000);
    setTimeout(() => {
        loginElemento.style.display = 'none'
    }, 3000);

}

function mostrarLogin() {
    loginElemento.style.transition = 'all 4s'
    loginElemento.style.display = 'block'
    setTimeout(() => {
        loginElemento.style.opacity = '100%'
    }, 100);

    ativarEfeitosLoucos(true)
}

let taskIdCores
function ativarEfeitosLoucos(boolean) {
    return;
    if (boolean) {
        taskIdCores = setInterval(() => {
            loginElemento.style.fontSize = `${getNumeroAleatorio(3, 5)}rem`
        }, 3000);
    } else {
        if (taskIdCores != 0) {
            clearInterval(taskIdCores)
            taskIdCores = 0;
        }
    }

}

// Chama a callback de quem usou essa funcao quando clicarem no botao de conectar
function clicouLogin(funcao) {
    botaoLogin.onclick = () => {
        let nomeSelecionado = loginElemento.getElementsByClassName("resposta")[0].value
        funcao(nomeSelecionado)
    }
}

function getNumeroAleatorio(min, max) {
    return Math.round(Math.random() * (max - min) + min);

}

export default { destravarLogin, travarLogin, clicouLogin, esconderLogin, mostrarLogin }