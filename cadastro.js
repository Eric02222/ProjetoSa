let cadastro = [];

let logado = [];

let usuario = document.getElementById("usuario");
let email = document.getElementById("email");
let senha = document.getElementById("senha");

function carregarCadastro() {
    let dados = localStorage.getItem("cadastro");
    if (dados) {
        cadastro = JSON.parse(dados);
    }
}

function salvarCadastro() {
    localStorage.setItem("cadastro", JSON.stringify(cadastro));
}

function carregarLogin() {
    let dadosUser = localStorage.getItem("login");
    if (dadosUser) {
        logado = JSON.parse(dadosUser);
    }
}

function salvarLogin() {
    localStorage.setItem("login", JSON.stringify(logado));
}

function registro() {
    let user = {
        username: usuario.value,
        email: email.value,
        senha: senha.value
    }

    if (!user.username || !user.email || !user.senha) {
        document.getElementById("aviso").innerHTML = "Preencha todos os campos";
    } else if (existe(user.username, user.email) == true) {
        document.getElementById("aviso").innerHTML = "Usuario já cadastrado!";
    } else {
        cadastro.push(user);
        salvarCadastro();
        document.getElementById("aviso").innerHTML = "Usuario cadastrado";
        window.location = "login.html";
    }

    usuario.value = null;
    email.value = null;
    senha.value = null;
}


function login() {
    let pos = indexOfByEmail(document.getElementById("email").value);
    console.log(pos)
    let nomerUsuario = cadastro[pos].username;

    let userLogado = {
        username: nomerUsuario,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    }

    if (indexOfByEmail(userLogado.email) == 1) {
        document.getElementById("aviso").innerHTML = "Você já está logado em sua conta!";
    } else if (authentica(userLogado.email, userLogado.senha) == true) {
        document.getElementById("aviso").innerHTML = "Login efetuado com sucesso";
        logado.push(userLogado);
        salvarLogin();
        window.location = "main.html";
    } else {
        document.getElementById("aviso").innerHTML = "Senha ou email inválido";
    }
    document.getElementById("email").value = null;
    document.getElementById("senha").value = null;
}

/*function logout() {
    login = false;
    document.getElementById("aviso").innerHTML = "Logout efetuado com sucesso";
}*/


function existe(username, email) {
    for (let user of cadastro) {
        if (user.username == username || user.email == email) {
            return true;
        }
    }
    return false;
}

function authentica(email, senha) {
    for (let user of cadastro) {
        if (user.email == email && user.senha == senha) {
            return true;
        }
    }
    return false;
}

function indexOfByEmail(email) {
    for (let i = 0; i < cadastro.length; i++) {
        if (cadastro[i].email === email) {
            return i;
        }
    }
    return -1;
}

window.onload = carregarCadastro();
window.onload = carregarLogin();

