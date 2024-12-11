let perguntas = [];

// Buscar elementos do DOM
let titulo = document.getElementById("titulo");
let descricao = document.getElementById("descricao");

// Função para carregar perguntas do LocalStorage
function carregarPe() {
    let dados = localStorage.getItem("pergunta");
    if (dados) {
        perguntas = JSON.parse(dados);
    }

}

// Função para salvar as perguntas no LocalStorage
function salvarPe() {
    console.log("Cadastrando a questão id: "+perguntas[0].id);
    localStorage.setItem("pergunta", JSON.stringify(perguntas));
}

//Função para carregar o usuario logado
carregarLogin();

//Função para enviar a pergunta e salvar no LocalStorage
function enviarPe() {
    JSON.parse(localStorage.getItem("logado"));
    let id = perguntas.length ? perguntas[perguntas.length - 1].id + 1 : 1;

    while (perguntas.some(perguntas => perguntas.id === id)) {
        id++;
    }

    let questao = {
        usuario: logado.username,
        email: logado.email,
        titulo: titulo.value,
        descricao: descricao.value,
        id: id
    }

    if (!questao.titulo || !questao.descricao) {
        document.getElementById("avisoCriarPe").innerHTML = "Preencha todos os campos";
    } else {
        perguntas.unshift(questao);
        salvarPe();
        //document.getElementById("aviso").innerHTML = "Pergunta Enviada com sucesso";
        window.location.href = "index.html";
    }

}

// Carregar funções ao carregar a página
window.onload = function (){
    carregarPe();
}