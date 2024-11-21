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

carregarLogin();

function enviarPe() {
    JSON.parse(localStorage.getItem("logado"));

    let questao = {
        usuario: logado.username,
        email: logado.email,
        titulo: titulo.value,
        descricao: descricao.value,
        respostas: ""
    }


    perguntas.push(questao);
    salvarPe();
    document.getElementById("aviso").innerHTML = "Pergunta Enviada com sucesso";


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