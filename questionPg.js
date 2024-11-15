let perguntas = [];

let titulo = document.getElementById("titulo");
let descricao = document.getElementById("descricao");

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

carregarLogin();

function enviarPe() {
    let questao = {
        usuario: logado[0].username,
        email: logado[0].email,
        titulo: titulo.value,
        descricao: descricao.value
    }

    if (!titulo || !descricao) {
        document.getElementById("aviso").innerHTML = "Preencha todos os campos"
    } else {
        perguntas.push(questao);
        salvarPe();
        document.getElementById("aviso").innerHTML = "Pergunta Enviada com sucesso";
    }

    titulo = document.getElementById("titulo").value = null;
    descricao = document.getElementById("descricao").value = null;

}



function authentica(titulo, descricao) {
    for (let i = 0; i < perguntas.length; ++i) {
        if (perguntas.titulo === titulo && perguntas.descricao === descricao) {
            return i;
        }
    }
}

window.onload = carregarPe();