let cadastro = [];
let logado = [];

// Buscar elementos do DOM
let usuario = document.getElementById("usuario");
let email = document.getElementById("email");
let senha = document.getElementById("senha");
let aviso = document.getElementById("aviso");

// Função para carregar cadastro do localStorage
function carregarCadastro() {
    let dados = localStorage.getItem("cadastro");
    if (dados) {
        cadastro = JSON.parse(dados);
    }
}

// Função para salvar cadastro no localStorage
function salvarCadastro() {
    localStorage.setItem("cadastro", JSON.stringify(cadastro));
}

// Função para carregar login do localStorage
function carregarLogin() {
    let dadosUser = localStorage.getItem("login");
    if (dadosUser) {
        logado = JSON.parse(dadosUser);
    }
}

// Função para salvar login no localStorage
function salvarLogin() {
    localStorage.setItem("login", JSON.stringify(logado));
}

// Função para registrar um novo usuário
function registro() {
    let user = {
        username: usuario.value,
        email: email.value,
        senha: senha.value
    }

    if (!user.username || !user.email || !user.senha) {
        aviso.innerHTML = "Preencha todos os campos";
    } else if (existe(user.username, user.email)) {
        aviso.innerHTML = "Usuário já cadastrado!";
    } else {
        cadastro.push(user);
        salvarCadastro();
        aviso.innerHTML = "Usuário cadastrado com sucesso!";
        window.location = "login.html";  // Redireciona para a tela de login após o cadastro
    }

    usuario.value = null;
    email.value = null;
    senha.value = null;
}

// Função de login
function login() {
    // Verificar se já há alguém logado
    if (logado.length > 0) {
        aviso.innerHTML = "Você já está logado!";
        return;
    }

    let emailLogin = document.getElementById("emailLo").value;
    let senhaLogin = document.getElementById("senhaLo").value;
    let pos = indexOfByEmail(emailLogin);

    if (pos === -1) {
        aviso.innerHTML = "Email não encontrado!";
    } else {
        let userLogado = cadastro[pos];

        if (userLogado.senha === senhaLogin) {
            logado = [userLogado];  // Definir usuário logado
            salvarLogin();  // Salvar login no localStorage
            aviso.innerHTML = "Login efetuado com sucesso!";
            window.location = "main.html";  // Redireciona para a página principal após o login
        } else {
            aviso.innerHTML = "Senha inválida!";
        }
    }

    document.getElementById("emailLo").value = null;
    document.getElementById("senhaLo").value = null;
}

// Função de logout
function logout() {
    logado = [];  // Limpa o array logado
    localStorage.setItem("login", JSON.stringify(logado));  // Salva no localStorage
    window.location = "login.html";  // Redireciona para a tela de login após o logout
}

// Função para verificar se o usuário existe
function existe(username, email) {
    for (let user of cadastro) {
        if (user.username === username || user.email === email) {
            return true;
        }
    }
    return false;
}

// Função para autenticar o usuário
function authentica(email, senha) {
    for (let user of cadastro) {
        if (user.email === email && user.senha === senha) {
            return true;
        }
    }
    return false;
}

// Função para encontrar o índice do usuário pelo email
function indexOfByEmail(email) {
    for (let i = 0; i < cadastro.length; i++) {
        if (cadastro[i].email === email) {
            return i;
        }
    }
    return -1;
}

// Carregar dados ao carregar a página
window.onload = function () {
    carregarCadastro();
    carregarLogin();
}
