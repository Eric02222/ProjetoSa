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
    let id = perguntas.length ? perguntas[perguntas.length - 1].id + 1 : 1;

    while(perguntas.some(perguntas => perguntas.id === id)){
        id++;
    }

    let questao = {
        usuario: logado.username,
        email: logado.email,
        titulo: titulo.value,
        descricao: descricao.value,
        id: id
    }

    if(!questao.titulo || !questao.descricao){
        document.getElementById("avisoCriarPe").innerHTML = "Preencha todos os campos";
    }else{
        perguntas.unshift(questao);
        salvarPe();
        //document.getElementById("aviso").innerHTML = "Pergunta Enviada com sucesso";
        window.location.href = "index.html"; 
    }

}


function authentica(titulo, descricao) {
    for (let i = 0; i < perguntas.length; ++i) {
        if (perguntas.titulo === titulo && perguntas.descricao === descricao) {
            return i;
        }
    }
}



window.onload = carregarPe();