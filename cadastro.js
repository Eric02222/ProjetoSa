let cadastro = [];

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

function registro() {
    let user = {
        username: usuario.value,
        email: email.value,
        senha: senha.value
    }

    if (existe(user.username, user.email) == true) {
        document.getElementById("aviso").innerHTML = "Usuario já cadastrado!";
    } else {
        cadastro.push(user);
        salvarCadastro();
        document.getElementById("aviso").innerHTML = "Usuario cadastrado";
        //window.location = "login.html";
    }
}


function login() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let login = false;

    if (authentica(email, senha) == true) {
        document.getElementById("aviso").innerHTML = "Login efetuado com sucesso";
        login = true;
    } else {
        document.getElementById("aviso").innerHTML = "Senha ou email inválido";
    }
}

function resetPass() { //focar caso finalizar outras opçoes mais importantes
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let senhaCo = document.getElementById("senhaCo").value;

    if (authentica(email) == true && senha == senhaCo) {
        user.senha = senha;
        salvarCadastro();
        document.getElementById("aviso").innerHTML = "Senha alterada com sucesso";
    } else {
        document.getElementById("aviso").innerHTML = "Senhas não conferem";
    }

}

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

window.onload = carregarCadastro();