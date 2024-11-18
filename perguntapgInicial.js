function carregarPe() {
    let dados = localStorage.getItem("pergunta");
    if (dados) {
        perguntas = JSON.parse(dados);
    }

}

function salvarPe() {
    localStorage.setItem("pergunta", JSON.stringify(perguntas));
}

function irPgPerguntaCompleta() {
    localStorage.setItem("peEspecifica", JSON.stringify([]));

    var adiquiriTitulo = document.getElementById("tituloPe");
    var adiquiriTexto = document.getElementById("descriçaoPe");
    var adiquiriUsuario = document.getElementById("usuarioPe");

    var peEspecifica = {
        titulo: adiquiriTitulo.textContent,
        texto: adiquiriTexto.textContent,
        usuario: adiquiriUsuario.textContent
    }

    localStorage.setItem("peEspecifica", JSON.stringify(peEspecifica));
    

    window.location.href = "mostrarPe.html";
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



function exibirPe() {
    for (let i = 0; i < perguntas.length; i++) {
        if (perguntas) {
            let titulo = perguntas[i].titulo;
            let descricao = perguntas[i].descricao;
            let usuario = perguntas[i].usuario;

            document.getElementById("perguntas").innerHTML += "<div class='perguntaspgInc' onclick='irPgPerguntaCompleta()'>" + "<h3 id='tituloPe'>" + titulo + "</h3>" + "<p id='descriçaoPe'>" + descricao + "</p>" + "<p id='usuarioPe'>" + usuario;
        } else {
            console.log("Nenhuma pergunta encontrada")
        }
    }

}

window.onload = function () {
    carregarPe();
    exibirPe();
}
