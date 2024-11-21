function carregarPe() {
    let dados = localStorage.getItem("pergunta");
    if (dados) {
        perguntas = JSON.parse(dados);
    }

}

function salvarPe() {
    localStorage.setItem("pergunta", JSON.stringify(perguntas));
}

function irPgPerguntar() {
    JSON.parse(localStorage.getItem("logado"));
    if (logado == null) {
        window.location.href = "criarPe.html"
    } else {
        modal.style.display = "block";
    }
}

function irPgLogin() {
    window.location.href = "login.html"
}

function irPgCadastro() {
    window.location.href = "signUp.html"
}


function mostrarPeComp() {
    carregarPe();
    let peEspecifica = JSON.parse(localStorage.getItem("peEspecifica"));

    if (peEspecifica && peEspecifica.titulo && peEspecifica.descricao && peEspecifica.usuario) {
        document.getElementById("mostrar-Pergunta").innerHTML = `
            <p id="usuarioPe-completa">${peEspecifica.usuario}</p>
            <h2 id="titulo-Completo">${peEspecifica.titulo}</h2>
            <p id="descricao-completa">${peEspecifica.descricao}</p>`;
    }

}

function responderPe() {
    carregarPe()
    let pergunta = JSON.parse(localStorage.getItem("peEspecifica"));
    let respostaPe = document.getElementById("responder").value;
    const respostas = JSON.parse(localStorage.getItem("respostas")) || []
    let id = pergunta.id;

    let resposta = {
        resposta: respostaPe,
        id: id
    };


    if (!resposta.resposta) {
        document.getElementById("aviso").innerHTML = "Digite uma resposta antes de enviar!";
    } else {
        respostas.push(resposta);
        localStorage.setItem("respostas", JSON.stringify(respostas));
    }

    respostaPe = document.getElementById("responder").value = null;
    location.reload();
}

function mostrarRespostas(){
    let peEspecifica = JSON.parse(localStorage.getItem("peEspecifica"));
    respostas = JSON.parse(localStorage.getItem("respostas"))

    for (let i = 0; i < respostas.length; i++) {
        if (peEspecifica.id === respostas[i].id) {
            let resposta = respostas[i].resposta;
            document.getElementById("resposta").innerHTML += `
            <div class="moRespostas">
                <p id="repostasDaPergunta">${resposta}</p>
            </div>`;
        }
    }
}

// Obtém o modal
let modal = document.getElementById("myModal");

// Obtém o elemento <span> que fecha o modal
let span = document.getElementsByClassName("close")[0];

// Quando o usuário clicar no <span> (x), fecha o modal
span.onclick = function () {
    modal.style.display = "none";
}

// Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.onload = function () {
    carregarPe()
    mostrarPeComp()
    mostrarRespostas()
}
