function carregarPe() {
    let dados = localStorage.getItem("pergunta");
    if (dados) {
        perguntas = JSON.parse(dados);
    }

}

function salvarPe() {
    localStorage.setItem("pergunta", JSON.stringify(perguntas));
}

function salvarPe() {
    localStorage.setItem("pergunta", JSON.stringify(perguntas));
}

function irPgPerguntar() {
    if (logado.length == 0) {
        alert("E necessario crira uma conta")
    } else {
        window.location.href = "criarPe.html"
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

    let titulo = localStorage.getItem("titulo");
    let descricao = localStorage.getItem("descricao");
    let usuario = localStorage.getItem("usuario");

    if(titulo && descricao && usuario){
        document.getElementById("mostrar-Pergunta").innerHTML = "<p id='usuarioPe-completa'>" + usuario + "</p>" + "<h2 id='titulo-Completo'>" + titulo + "</h2>" + "<p id='descricao-completa'>" + descricao + "</p>"
    }
}

window.onload = function() {
    carregarPe()
    mostrarPeComp()
}
