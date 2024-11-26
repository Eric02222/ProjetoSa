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
    logado = JSON.parse(localStorage.getItem("logado"));
    if (logado == null) {
        modal.style.display = "block";
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

function mostrarRespostas() {
    let peEspecifica = JSON.parse(localStorage.getItem("peEspecifica"));
    respostas = JSON.parse(localStorage.getItem("respostas"))

    for (let i = 0; i < respostas.length; i++) {
        if (peEspecifica.id === respostas[i].id) {
            let resposta = respostas[i].resposta;
            document.getElementById("resposta").innerHTML += `   
                <p id="repostasDaPergunta">${resposta}</p>
            `;
        }
    }
}

//function editarPe() {}

function excluirPe() {
    let peEspecifica = JSON.parse(localStorage.getItem("peEspecifica"));
    let usuario = JSON.parse(localStorage.getItem("logado"));
    let respostas = JSON.parse(localStorage.getItem("respostas"));
    

    if (peEspecifica.usuario === usuario.username && peEspecifica.email === usuario.email) {
        let descricaoPe = peEspecifica.descricao;
        let idPe = peEspecifica.id;
        let idRespostas = respostas.id

        mostrarModalExcluir(descricaoPe, idPe, idRespostas)
    } else {
        document.getElementById("negarAcesso").innerHTML = "Voce não tem acesso"
    }

}

function mostrarModalExcluir(descricao, id, idRe) {
    perguntaParaExcluirId = id;
    respostasParaExcluirId = idRe;
    descricaoElemento = descricao;
    modalExcluir.style.display = "block";
}

function excluirPergunta() {
    let perguntas = JSON.parse(localStorage.getItem("pergunta"));
    let respostas = JSON.parse(localStorage.getItem("respostas"));

    perguntas = perguntas.filter(perguntas => perguntas.id != perguntaParaExcluirId)
    respostas = respostas.filter(respostas => respostas.id != respostasParaExcluirId)

    localStorage.setItem("pergunta", JSON.stringify(perguntas))
    localStorage.setItem("respostas", JSON.stringify(respostas))
    modal.style.display = "none";
    window.location.href = "main.html";
}

function cancelar() {
    modalEditar.style.display = "none";
    modalExcluir.style.display = "none";
}

// Obtém o modal
let modal = document.getElementById("myModal");
let modalEditar = document.getElementById("modalEditar");
let modalExcluir = document.getElementById("modalExcluir");

let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}

// Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
window.onclick = function (event) {
    if (event.target == modal || event.target == modalEditar || event.target == modalExcluir) {
        modal.style.display = "none";
        modalEditar.style.display = "none";
        modalExcluir.style.display = "none";
    }
}

window.onload = function () {
    carregarPe()
    mostrarPeComp()
    mostrarRespostas()
}
