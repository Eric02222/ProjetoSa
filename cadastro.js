let cadastro = [];

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
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let senhaCo = document.getElementById("senhaCo").value;

    if (!email || !senha || !senhaCo || senha != senhaCo) {
        document.getElementById("aviso").innerHTML = "verifique se Senha ou email são estao corretos";
    } else {
        cadastro.push({ email: email, senha: senha });
        salvarCadastro();
        window.location = "login.html";
    }
}


function login() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let usuarioEncontrado = cadastro.find(user => user.email === email && user.senha === senha);

    if (!usuarioEncontrado) {
        document.getElementById("aviso").innerHTML = "Senha ou email inválido";
    } else {
        document.getElementById("aviso").innerHTML = "Login efetuado com sucesso";
    }
}

function resetPass() {
    let senha = document.getElementById("senha").value;
    let senhaCo = document.getElementById("senhaCo").value;
    let usuario = cadastro.find(user => senha)

    if ( !senha || !senhaCo || senha != senhaCo) {
        document.getElementById("aviso").innerHTML = "Senhas não conferem";
    } else {
        usuario.senha = senha;
        salvarCadastro();
        document.getElementById("aviso").innerHTML = "Senha alterada com sucesso";
    }

}

window.onload = carregarCadastro();