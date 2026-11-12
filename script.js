


const campoSenha = document.getElementById("senha");
const tamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valor-tamanho");

const maiusculas = document.getElementById("maiusculas");
const minusculas = document.getElementById("minusculas");
const numeros = document.getElementById("numeros");
const especiais = document.getElementById("especiais");

const mensagem = document.getElementById("mensagem");
const barra = document.getElementById("barra");
const forcaTexto = document.getElementById("forca-texto");



tamanho.addEventListener("input", function() {

    valorTamanho.textContent = tamanho.value;

});




function gerarSenha() {

    let tamanhoSenha = Number(tamanho.value);

    let caracteres = "";
    let categorias = [];

    mensagem.textContent = "";

  

    if (!Number.isInteger(tamanhoSenha) ||
        tamanhoSenha < 4 || tamanhoSenha > 64) {

        mensagem.textContent =
            "Escolha um tamanho entre 4 e 64.";

        return;
    }

   

    if (maiusculas.checked) {

        let letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        caracteres += letrasMaiusculas;

        categorias.push(letrasMaiusculas);

    }



    if (minusculas.checked) {

        let letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";

        caracteres += letrasMinusculas;

        categorias.push(letrasMinusculas);

    }



    if (numeros.checked) {

        let numerosCaracteres = "0123456789";

        caracteres += numerosCaracteres;

        categorias.push(numerosCaracteres);

    }



    if (especiais.checked) {

        let caracteresEspeciais = "!@#$%&*?";

        caracteres += caracteresEspeciais;

        categorias.push(caracteresEspeciais);

    }

   

    if (categorias.length === 0) {

        mensagem.textContent =
            "Selecione pelo menos uma categoria!";

        campoSenha.value = "";

        atualizarForca(0);

        return;
    }

    if (categorias.length > tamanhoSenha) {

        mensagem.textContent =
            "Aumente o tamanho para incluir todas as categorias.";

        campoSenha.value = "";

        atualizarForca(0);

        return;
    }

  

    let senha = [];



    for (let i = 0; i < categorias.length; i++) {

        let categoria = categorias[i];

        let indice = Math.floor(
            Math.random() * categoria.length
        );

        senha.push(categoria[indice]);

    }


    for (let i = senha.length; i < tamanhoSenha; i++) {

        let indice = Math.floor(
            Math.random() * caracteres.length
        );

        senha.push(caracteres[indice]);

    }


    for (let i = senha.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        let temporario = senha[i];

        senha[i] = senha[j];

        senha[j] = temporario;

    }

    // EXIBIR SENHA

    campoSenha.value = senha.join("");

    mensagem.textContent = "Senha gerada com sucesso!";

    // ATUALIZAR FORÇA

    calcularForca();

}


function calcularForca() {

    let pontos = 0;

    let senha = campoSenha.value;

    if (senha.length >= 8) pontos++;

    if (senha.length >= 12) pontos++;

    if (/[A-Z]/.test(senha)) pontos++;

    if (/[a-z]/.test(senha)) pontos++;

    if (/[0-9]/.test(senha)) pontos++;

    if (/[^A-Za-z0-9]/.test(senha)) pontos++;

    if (pontos <= 2) {

        atualizarForca(20, "FRACA", "#ef4444");

    } else if (pontos <= 4) {

        atualizarForca(60, "MÉDIA", "#f59e0b");

    } else {

        atualizarForca(100, "FORTE", "#22c55e");

    }

}


function atualizarForca(valor, texto = "AGUARDANDO", cor = "#393036") {

    barra.style.width = valor + "%";

    barra.style.background = cor;

    forcaTexto.textContent = texto;

    forcaTexto.style.color = cor;

}



async function copiarSenha() {

    if (campoSenha.value === "") {

        mensagem.textContent = "Gere uma senha primeiro!";

        return;

    }

    try {

        await navigator.clipboard.writeText(campoSenha.value);

        mensagem.textContent = "Senha copiada com sucesso!";

    } catch (erro) {

        mensagem.textContent =
            "Não foi possível copiar. Selecione a senha manualmente.";

    }

}


// FUNÇÃO PARA LIMPAR

function limparSenha() {

    campoSenha.value = "";

    mensagem.textContent = "";

    atualizarForca(0);

}


// EVENTOS DOS BOTÕES

document.getElementById("gerar")
    .addEventListener("click", gerarSenha);

document.getElementById("copiar")
    .addEventListener("click", copiarSenha);

document.getElementById("limpar")
    .addEventListener("click", limparSenha);
