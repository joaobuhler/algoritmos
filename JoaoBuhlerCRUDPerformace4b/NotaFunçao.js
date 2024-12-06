let listaNotas = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let notas = null; //variavel global 

window.onload=adicionarNotasLista();

bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaNotas.length; i++) {
        const notas = listaNotas[i];
        if (notas.ra == chave) {
            notas.posicaoNaLista = i;
            return listaNotas[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const ra = document.getElementById("inputRA").value;
    if (isNaN(ra) || !Number.isInteger(Number(ra))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputRA").focus();
        return;
    }

    if (ra) { // se digitou um Id
        notas = procurePorChavePrimaria(ra);
        if (notas) { //achou na lista
            mostrarDadosNotas(notas);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputRA").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    const ra = parseInt(document.getElementById("inputRA").value);
    if(procurePorChavePrimaria(ra)!==null){
        alert("erro")
        
    }else{
        bloquearAtributos(false);
        visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
        oQueEstaFazendo = 'inserindo';
        mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
        document.getElementById("inputRA").focus();
}
}
// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    let ra;
    if (notas == null) {
        ra = parseInt(document.getElementById("inputRA").value);
    } else {
        ra = notas.ra;
    }

    const nome = document.getElementById("inputNome").value;
    const nota1 = parseFloat(document.getElementById("inputNota1").value);
    const nota2 = parseFloat(document.getElementById("inputNota2").value);
    const nota3 = parseFloat(document.getElementById("inputNota3").value);
    const nota4 = parseFloat(document.getElementById("inputNota4").value);
   

    if (ra && nome && nota1 && nota2 && nota3 && nota4) {
        switch (oQueEstaFazendo) {
            case 'inserindo':
                notas = new Notas(ra, nome, nota1, nota2, nota3, nota4);
                listaNotas.push(notas);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                notasAlterado = new Notas(ra, nome, nota1, nota2, nota3, nota4);
                listaNotas[notas.posicaoNaLista] = notasAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                listaNotas.splice(notas.posicaoNaLista, 1);
                mostrarAviso("Excluído");
                break;
            default:
                mostrarAviso("Erro desconhecido");
        }

        salvarListaNoLocalStorage(); // Salva as alterações no Local Storage
        limparAtributos();
        listar();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

//backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto += 
            linha.ra+" - " +
            linha.nome+" - " +
            linha.nota1+" - " +
            linha.nota2+" - " +
            linha.nota3+" - " +
            linha.nota4+"<br>";
    }
    return texto;
}

function adicionarNotasLista() {
    listaNotas = []
    let linha = new Notas(1, "joao", 14, 2339, 267, 3);
    listaNotas.push(linha);

    linha = new Notas(2, "wesley", 13, 1460, 233, 3);
    listaNotas.push(linha);

    linha = new Notas(3,"bruno", 11, 3760, 816, 7 );
    listaNotas.push(linha);

    listar()

}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaNotas);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do cartas nos campos<input type="button" value="Listar cartases" onclick="preparaListagem()">
function mostrarDadosNotas(notas) {
    document.getElementById("inputRA").value = notas.ra;
    document.getElementById("inputNome").value = notas.nome;
    document.getElementById("inputNota1").value = notas.nota1;
    document.getElementById("inputNota2").value = notas.nota2;
    document.getElementById("inputNota3").value = notas.nota3;
    document.getElementById("inputNota4").value = notas.nota4;
    

    
    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputNota1").value = "";
    document.getElementById("inputNota2").value = "";
    document.getElementById("inputNota3").value = "";
    document.getElementById("inputNota4").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputRA").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputNota1").readOnly = soLeitura;
    document.getElementById("inputNota2").readOnly = soLeitura;
    document.getElementById("inputNota3").readOnly = soLeitura;
    document.getElementById("inputNota4").readOnly = soLeitura;
}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
    //none significa que o botão ficará invisível (visibilidade == none)
    //inline significa que o botão ficará visível 

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("inputRA").focus();
}

function salvarListaNoLocalStorage() {
    localStorage.setItem("listaNotas", JSON.stringify(listaNotas));
}

function carregarListaDoLocalStorage() {
    const listaSalva = localStorage.getItem("listaNotas");
    if (listaSalva) {
        listaNotas = JSON.parse(listaSalva); // Converte a string JSON de volta para um array
    } else {
        adicionarNotasLista(); // Cria a lista inicial caso não exista no Local Storage
    }
}
window.onload = function() {
    carregarListaDoLocalStorage(); // Carrega os dados do Local Storage ao carregar a página
    listar(); // Atualiza a interface com os dados carregados
};
    
