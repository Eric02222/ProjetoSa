// Função para carregar perguntas do localStorage
function carregarPe() {
    let dados = localStorage.getItem("pergunta");
    if (dados) {
        perguntas = JSON.parse(dados);
    }
}

// Função para salvar as perguntas no localStorage
function salvarPe() {
    localStorage.setItem("pergunta", JSON.stringify(perguntas));
}


//Função para levar a pagina de login
function irPgLogin() {
    window.location.href = "login.html"
}

//Função para levar a pagina de cadastro
function irPgCadastro() {
    window.location.href = "signUp.html"
}

//Função para carregar a pergunta clicada em outra pagina
function irPgPerguntar() {
    logado = JSON.parse(localStorage.getItem("logado"));
    if (logado == null) {
        modal.style.display = "block";
    } else {
        window.location.href = "criarPe.html"
    }
}


//Função que carrega a pergunta clicada na pagina
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

//Função para enviar resposta da pergunta carregada
function responderPe() {
    carregarPe()
    let pergunta = JSON.parse(localStorage.getItem("peEspecifica"));
    let respostaPe = document.getElementById("responder").value;
    let logado = JSON.parse(localStorage.getItem("logado"));
    let usuarioRe;
    const respostas = JSON.parse(localStorage.getItem("respostas")) || [];
    let id = pergunta.id;

    if (logado === null) {
        usuarioRe = "Usuário anônimo"
    } else {
        usuarioRe = logado.username
    }

    let resposta = {
        resposta: respostaPe,
        usuario: usuarioRe,
        id_perguntas: id
    };


    if (!resposta.resposta) {
        document.getElementById("avisoRe").innerHTML = "Digite uma resposta antes de enviar!";
    } else {
        respostas.unshift(resposta);
        localStorage.setItem("respostas", JSON.stringify(respostas));
        location.reload();
    }

    respostaPe = document.getElementById("responder").value = null;
}


//Função para carregar respostas da pergunta carregada
function mostrarRespostas() {
    let peEspecifica = JSON.parse(localStorage.getItem("peEspecifica"));
    respostas = JSON.parse(localStorage.getItem("respostas"))

    for (let i = 0; i < respostas.length; i++) {
        if (peEspecifica.id === respostas[i].id_perguntas) {
            let resposta = respostas[i].resposta;
            let usuarioDaRe = respostas[i].usuario;
            document.getElementById("resposta").innerHTML += `   
                <div id="mostrarRe">
                <p id="usuarioDaRepostas">${usuarioDaRe}</p>
                <p id="repostasDaPergunta">${resposta}</p>
                </div>
            `;
        }else{
            break
        }
    }
}

//Função para mostrar ou esconder botões
function exibirElementos() {

    //Vai esconder os botões de excluir e edicar a pergunta caso não for o mesmo usuario que a criou
    let usuario = JSON.parse(localStorage.getItem("logado"));
    let peEspecifica = JSON.parse(localStorage.getItem("peEspecifica"));
    if (usuario == null || peEspecifica.usuario != usuario.username && peEspecifica.email != usuario.email) {
        document.getElementById("botoesEd").style.display = "none";
    } else {
        document.getElementById("botoesEd").style.display = "block";

    }

    //Vai esconder os botões de cadastro e login, caso ja logado
    if (usuario == null) {
        document.getElementById("irPgLogin").style.display = "show";
        document.getElementById("irPgCadastro").style.display = "show";
        document.getElementById("deslogar").style.display = "none";
    } else {
        document.getElementById("irPgLogin").style.display = "none";
        document.getElementById("irPgCadastro").style.display = "none";
        document.getElementById("deslogar").style.display = "show";
    }
}

//função para abrir o modal de editar a pergunta carregada
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

//Função para adiquirir elementos da pergunta carregada para o modal
function mostrarModalEditar(titulo, descricao, id) {
    perguntaParaEditarId = id;
    tituloElemento = titulo;
    descricaoElemento = descricao;

    modalEditar.style.display = "block";
}

//Função que vai salvar a edição da pergunta no localstorage
function editarPergunta() {
    let perguntas = JSON.parse(localStorage.getItem("pergunta"));
    let peEspecifica = JSON.parse(localStorage.getItem("peEspecifica"));

    let edTitulo = document.getElementById("edTitulo").value;
    let edDescricao = document.getElementById("edDescricao").value;

    for (let pergunta of perguntas) {
        if (pergunta.id === perguntaParaEditarId) {
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

//função para abrir o modal de excluir a pergunta carregada
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

//Função para adiquirir elementos da pergunta carregada para o modal
function mostrarModalExcluir(descricao, id) {
    perguntaParaExcluirId = id;

    descricaoElemento = descricao;
    modalExcluir.style.display = "block";
}

//Função que vai excluir a pergunta no localstorage
function excluirPergunta() {
    let perguntas = JSON.parse(localStorage.getItem("pergunta"));
    let respostas = JSON.parse(localStorage.getItem("respostas"));

    for (let resposta of respostas) {
        if (resposta.id_perguntas == perguntaParaExcluirId) {
            respostas = respostas.filter(resposta => resposta.id_perguntas != perguntaParaExcluirId)
            localStorage.setItem("respostas", JSON.stringify(respostas))
        } else {
            break;
        }
    }

    perguntas = perguntas.filter(perguntas => perguntas.id != perguntaParaExcluirId)

    localStorage.setItem("pergunta", JSON.stringify(perguntas))
    modal.style.display = "none";
    window.location.href = "index.html";
}

//Função para fechar os modals de edição e exclusão
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

// Carregar funções ao carregar a página
window.onload = function () {
    carregarPe()
    exibirElementos()
    mostrarPeComp()
    mostrarRespostas()
}
