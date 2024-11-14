let perguntas = [];

let titulo = document.getElementById("titulo");
let descricao = document.getElementById("descricao");

function carregarPe() {
    let dados = localStorage.getItem("pergunta");
    if (dados) {
        perguntas = JSON.parse(dados);
    }
}

carregarLogin();

function salvarPe() {
    localStorage.setItem("pergunta", JSON.stringify(perguntas));
}

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

/*function editar() {
    window.location = "criarPe.html";
}*/



window.onload = carregarPe();