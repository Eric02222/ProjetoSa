function carregarPe() {
    let dados = localStorage.getItem("pergunta");
    if (dados) {
        perguntas = JSON.parse(dados);
    }

}

function salvarPe() {
    localStorage.setItem("pergunta", JSON.stringify(perguntas));
}

function limparPe(){
    localStorage.removeItem('peEspecifica');
}

function irPgPerguntar() {
    if (logado.length == 0) {
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
    
    if(peEspecifica.titulo && peEspecifica.texto && peEspecifica.usuario){
        document.getElementById("mostrar-Pergunta").innerHTML = "<p id='usuarioPe-completa'>" + peEspecifica.usuario + "</p>" + "<h2 id='titulo-Completo'>" + peEspecifica.titulo + "</h2>" + "<p id='descricao-completa'>" + peEspecifica.texto + "</p>"
    }

}

// Obtém o modal
let modal = document.getElementById("myModal");

// Obtém o elemento <span> que fecha o modal
let span = document.getElementsByClassName("close")[0];

// Quando o usuário clicar no <span> (x), fecha o modal
span.onclick = function() {
    modal.style.display = "none";
}

// Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.onload = function() {
    carregarPe()
    mostrarPeComp()
}
