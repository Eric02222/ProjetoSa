let cadastro = [];
let logado;

// Buscar elementos do DOM
const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
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
    let dadosUser = localStorage.getItem("logado");
    if (dadosUser) {
        logado = JSON.parse(dadosUser);
    }
}

// Função para salvar login no localStorage
function salvarLogin() {
    localStorage.setItem("logado", JSON.stringify(logado));
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
        window.location = "login.html";  
    }

    usuario.value = null;
    email.value = null;
    senha.value = null;
}

// Função de login
function login() {

    if (!email || !senha) {
        aviso.innerHTML = "Preencha todos os campos";
    }
    
    // Verificar se já há alguém logado
    if (logado != null) {
        aviso.innerHTML = "Você já está logado!";
        return;
    } else {
        let emailLogin = document.getElementById("emailLo").value;
        let senhaLogin = document.getElementById("senhaLo").value;
        let pos = indexOfByEmail(emailLogin);
        console.log(pos)
        
        if (pos === -1) {
            aviso.innerHTML = "Email não encontrado!";
        } else {
            let user = {
                username: cadastro[pos].username,
                email: emailLogin,
                senha: senhaLogin
            }
            let userLogado = cadastro[pos];
            if (userLogado.senha === senhaLogin) {
                logado = user; 
                salvarLogin();  
                window.location.href = "index.html";  
            } else {
                aviso.innerHTML = "Senha inválida!";
            }
        }
    }

   
    document.getElementById("emailLo").value = null;
    document.getElementById("senhaLo").value = null;
}

// Função de logout
function logout() {
    localStorage.setItem("logado", JSON.stringify(null));  // Salva no localStorage
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

// Função para encontrar o índice do usuário pelo email
function indexOfByEmail(email) {
    for (let i = 0; i < cadastro.length; i++) {
        if (cadastro[i].email === email) {
            return i;
        }
    }
    return -1;
}


// Carregar funções ao carregar a página
window.onload = function () {
    carregarCadastro();
    carregarLogin();
}
