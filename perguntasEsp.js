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

    let peEspecifica = JSON.parse(localStorage.getItem("peEspecifica"));
    

    if(peEspecifica.titulo && peEspecifica.texto && peEspecifica.usuario){
        document.getElementById("mostrar-Pergunta").innerHTML = "<p id='usuarioPe-completa'>" + peEspecifica.usuario + "</p>" + "<h2 id='titulo-Completo'>" + peEspecifica.titulo + "</h2>" + "<p id='descricao-completa'>" + peEspecifica.texto + "</p>"
    }

}

window.onload = function() {
    carregarPe()
    mostrarPeComp()
}
