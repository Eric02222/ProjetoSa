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
    let logado = JSON.parse(localStorage.getItem("logado"));
    let usuarioRe;
    const respostas = JSON.parse(localStorage.getItem("respostas")) || [];
    let id = pergunta.id;

    if(logado === null){
        usuarioRe = "Usuário anônimo"
    }else{
        usuarioRe = logado.username
    }

    let resposta = {
        resposta: respostaPe,
        usuario: usuarioRe,
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
            let usuarioDaRe = respostas[i].usuario;
            document.getElementById("resposta").innerHTML += `   
                <div id="mostrarRe">
                <p id="usuarioDaRepostas">${usuarioDaRe}</p>
                <p id="repostasDaPergunta">${resposta}</p>
                </div>
            `;
        }
    }
}

function editarPe() {
    let usuario = JSON.parse(localStorage.getItem("logado"));
    let peEspecifica = JSON.parse(localStorage.getItem("peEspecifica"));

    if (usuario == null || peEspecifica.usuario != usuario.username && peEspecifica.email != usuario.email) {
        document.getElementById("negarAcesso").innerHTML = "Voce não tem acesso"

    } else if (peEspecifica.usuario === usuario.username && peEspecifica.email === usuario.email) {
        let tituloPe = document.getElementById("titulo-Completo").textContent;
        let descricaoPe = document.getElementById("descricao-completa").textContent;
        let idPe = peEspecifica.id;

        document.getElementById("edTitulo").value = tituloPe;
        document.getElementById("edDescricao").value = descricaoPe;

        mostrarModalEditar(descricaoPe, descricaoPe, idPe)
    }
}

function mostrarModalEditar(titulo, descricao, id) {
    perguntaParaEditarId = id;
    tituloElemento = titulo;
    descricaoElemento = descricao;

    modalEditar.style.display = "block";
}

function editarPergunta() {
    let perguntas = JSON.parse(localStorage.getItem("pergunta"));
    let peEspecifica = JSON.parse(localStorage.getItem("peEspecifica"));

    let edTitulo = document.getElementById("edTitulo").value;
    let edDescricao = document.getElementById("edDescricao").value;

    for (let pergunta of perguntas) {
        if (pergunta.id === perguntaParaEditarId) {
            //console.log(pergunta.id)
            pergunta.titulo = edTitulo;
            pergunta.descricao = edDescricao;
            peEspecifica.titulo = edTitulo;
            peEspecifica.descricao = edDescricao;
            
        }
    }
    localStorage.setItem("pergunta", JSON.stringify(perguntas));
    localStorage.setItem("peEspecifica", JSON.stringify(peEspecifica));
    location.reload();

}

function excluirPe() {
    let peEspecifica = JSON.parse(localStorage.getItem("peEspecifica"));
    let usuario = JSON.parse(localStorage.getItem("logado"));

    if (usuario == null || peEspecifica.usuario != usuario.username && peEspecifica.email != usuario.email) {
        document.getElementById("negarAcesso").innerHTML = "Voce não tem acesso"

    } else if (peEspecifica.usuario === usuario.username && peEspecifica.email === usuario.email) {
        let descricaoPe = peEspecifica.descricao;
        let idPe = peEspecifica.id;

        mostrarModalExcluir(descricaoPe, idPe)
    }

}

function mostrarModalExcluir(descricao, id) {
    perguntaParaExcluirId = id;

    descricaoElemento = descricao;
    modalExcluir.style.display = "block";
}

function excluirPergunta() {
    let perguntas = JSON.parse(localStorage.getItem("pergunta"));
    let respostas = JSON.parse(localStorage.getItem("respostas"));

    for (let resposta of respostas) {
        if (resposta.id == perguntaParaExcluirId) {
            respostas = respostas.filter(resposta => resposta.id != perguntaParaExcluirId)
            localStorage.setItem("respostas", JSON.stringify(respostas))
        }
    }

    perguntas = perguntas.filter(perguntas => perguntas.id != perguntaParaExcluirId)

    localStorage.setItem("pergunta", JSON.stringify(perguntas))
    modal.style.display = "none";
    window.location.href = "index.html";
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
