let perguntas = [];
function carregarPe() {
    let dados = localStorage.getItem("pergunta");
    if (dados) {
        perguntas = JSON.parse(dados);
    }

}

function salvarPe() {
    localStorage.setItem("pergunta", JSON.stringify(perguntas));
}

function irPgPerguntaCompleta(index) {
    localStorage.setItem("peEspecifica", JSON.stringify([]));


    localStorage.setItem("peEspecifica", JSON.stringify(perguntas[index]));


    window.location.href = "mostrarPe.html";
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

function carregarElementosPergunta(){
    let p1 = {
        usuario: "Eliete",
        email: "eliete@gmail.com",
        titulo: "sobre a determinação e progressão de regime de cumprimento da pena considerando a legislação vigente e jurisprudência dos tribunais superiores, assinale a afirmativa correta.",
        descricao: "a) Os regimes semiabertos e aberto dependem da quantidade de pena aplicada apenas. (b) O condenado por crime contra a administração pública terá a progressão de regime do cumprimento da pena condicionada à reparação do dano que causou, ou à devolução do produto do ilícito praticado, com os acréscimos legais.] c) A prática de falta grave interrompe o prazo para a progressão de regime e para o livramento condicional. d) A partir da vigência da Lei nº 13.964/2019 ('Pacote Anticrime'), o apenado primário que tiver cometido o crime sem violência à pessoa ou grave ameaça poderá progredir de regime se tiver cumprido 20% (vinte por cento) da pena, desde que ostente boa conduta carcerária. e) A execução da pena privativa de liberdade ficará sujeita à forma regressiva, com a transferência para qualquer dos regimes mais rigorosos, quando o condenado sofrer condenação, por crime anterior, cuja pena, somada ao restante da pena em execução, torne incabível o regime.",
        id: 1
    }

    let p2 = {
        usuario: "Carlos",
        email: "Carl@gmail.com",
        titulo: "O Registro de Títulos e Documentos (RTD) é um instrumento essencial para garantir a validade e a segurança jurídica de documentos",
        descricao: "O Registro de Títulos e Documentos (RTD) é um instrumento essencial para garantir a validade e a segurança jurídica de documentos. Ele confere diferentes efeitos, incluindo a eficácia probatória, a validade de documentos estrangeiros, a conservação e a autenticação de data. Qual das alternativas melhor descreve a aplicação do princípio da territorialidade no Registro de Títulos e Documentos (RTD), prevista no art. 130 da Lei de Registros Públicos (Lei 6.015/1973)? A A territorialidade no RTD limita o registro de documentos a cartórios específicos, dependendo da natureza do documento e da área de atuação estabelecida por lei. A territorialidade no RTD permite que os documentos sejam registrados em qualquer cartório do país, independentemente",
        id: 2
    }

    let p3 = {
        usuario: "Carlos",
        email: "Carl@gmail.com",
        titulo: "assinale a alternativa que apresenta corretamente o sistema de numeração mais adequado para os sistema digitais",
        descricao: "assinale a alternativa que apresenta corretamente o sistema de numeração mais adequado para os sistema digitais, conhecido como sistema numérico de base 2 nele existem apenas dois símbolos numéricos possível, o 0 e o 1. apresenta valor posicional, assim para cada dígito binário do numero, há um valor próprio ou peso, o qual é expresso em potências de 2.",
        id: 3
    }


    perguntas.unshift(p1);
    perguntas.unshift(p2);
    perguntas.unshift(p3);

    localStorage.setItem("pergunta", JSON.stringify(perguntas));
}

function carregarElementosCadastro(){
    let cadastro = JSON.parse(localStorage.getItem("cadastro"));

    let user1 = {
        username: "Eliete",
        email: "eliete@gmail.com",
        senha: "eli123"
    }

    let user2 = {
        username: "Carlos",
        email: "Carl@gmail.com",
        senha: "carl12345"
    }


    cadastro.push(user1);
    cadastro.push(user2);

    localStorage.setItem("cadastro", JSON.stringify(cadastro));
}

function exibirPe() {
    if (perguntas != null && perguntas.length > 0) {
        for (let i = 0; i < perguntas.length; i++) {
            let titulo = perguntas[i].titulo;
            let descricao = perguntas[i].descricao;
            let usuario = perguntas[i].usuario;

            document.getElementById("perguntas").innerHTML += `
            <div class="perguntaspgInc" onclick="irPgPerguntaCompleta(${i})">
                <h3 id="tituloPe">${titulo}</h3>
                <p id="descriçaoPe">${descricao}</p>
                <p id="usuarioPe">${usuario}</p>
            </div>`;
        }
    } else {

        console.log("Nenhuma pergunta encontrada")
        document.getElementById("perguntas").innerHTML += `
            <div class="avisoPgVazia">
                <h3 id="tituloPe">Nenhuma Pergunta Criada</h3>
            </div>`;
    }
    
}

function exibirElementos() {
    let usuario = JSON.parse(localStorage.getItem("logado"));
    if (usuario == null) {
        document.getElementById("irPgLogin").style.display = "show";
        document.getElementById("irPgCadastro").style.display = "show";
        document.getElementById("irPgPergunta").style.margin = "0 0 0 62.5vw";
    } else {
        document.getElementById("irPgLogin").style.display = "none";
        document.getElementById("irPgCadastro").style.display = "none";
        document.getElementById("irPgPergunta").style.margin = "0 0 0 76.5vw";
    }
}


// Obtém o modal
let modal = document.getElementById("myModal");

// Obtém o elemento <span> que fecha o modal
let span = document.getElementsByClassName("close")[0];

// Quando o usuário clicar no <span> (x), fecha o modal
span.onclick = function () {
    modal.style.display = "none";
}

// Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.onload = function () {
    carregarPe();
    exibirElementos();
    exibirPe();
}

