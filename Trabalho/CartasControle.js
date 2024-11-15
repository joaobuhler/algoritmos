let listaCartas = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let cartas = null; //variavel global 

window.onload=adicionarCartasLista();

bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaCartas.length; i++) {
        const cartas = listaCartas[i];
        if (cartas.id == chave) {
            cartas.posicaoNaLista = i;
            return listaCartas[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const id = document.getElementById("inputId").value;
    if (isNaN(id) || !Number.isInteger(Number(id))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputId").focus();
        return;
    }

    if (id) { // se digitou um Id
        cartas = procurePorChavePrimaria(id);
        if (cartas) { //achou na lista
            mostrarDadosCartas(cartas);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputId").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputId").focus();

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
    //gerencia operações inserir, alterar e excluir na lista

// obter os dados a partir do html

    let id;
    if (cartas == null) {
         id = parseInt(document.getElementById("inputId").value);
    } else {
        id = cartas.id;
    }

    const nome = document.getElementById("inputMarca").value;
    const nivel = document.getElementById("inputModelo").value;
    const raridade = document.getElementById("inputFabricante").value;
    const dataLancamento = document.getElementById("inputDataLancamento").value;
    const vida = parseInt(document.getElementById("inputMemoriaRAM").value);
    const dano = parseInt(document.getElementById("inputMemoriaROM").value);
    const elixir = parseFloat(document.getElementById("inputPreco").value);
    //verificar se o que foi digitado pelo USUÁRIO está correto
if(id && nome && nivel && raridade && dataLancamento && vida && dano && elixir ){// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                cartas = new Cartas(id, nome, nivel, raridade, dataLancamento, vida, dano, elixir);
                listaCartas.push(cartas);
                mostrarAviso("Inserido na lista");
                listar()
                break;
            case 'alterando':
                cartasAlterado = new Cartas(id, nome, nivel, raridade, dataLancamento, vida, dano, elixir);
                listaCartas[cartas.posicaoNaLista] = cartasAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaCartas.length; i++) {
                    if (cartas.posicaoNaLista != i) {
                        novaLista.push(listaCartas[i]);
                    }
                }
                listaCartas = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputId").focus();
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
            linha.id+" - " +
            linha.marca+" - " +
            linha.modelo+" - " +
            linha.fabricante+" - " +
            linha.dataLancamento+" - " +
            linha.memoriaRAM+" - " +
            linha.memoriaROM+" - " +
            linha.preco+"<br>";
    }
    return texto;
}

function adicionarCartasLista() {
    listaCartas = []
    let linha = new Cartas(1, "Samsung","A51", "Samsung", "2023-01-13", 8, 256, 3000);
    listaCartas.push(linha);

    linha = new Cartas(2, "Samsung","S23", "Samsung", "2023-07-08", 16, 128, 5000);
    listaCartas.push(linha);

    linha = new Cartas(3,"Iphone","Iphone 15", "Apple", "2022-09-22", 8, 256, 3000 );
    listaCartas.push(linha);

    listar()

}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaCartas);
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
function mostrarDadosCartas(cartas) {
    document.getElementById("inputId").value = cartas.id;
    document.getElementById("inputMarca").value = cartas.marca;
    document.getElementById("inputModelo").value = cartas.modelo;
    document.getElementById("inputFabricante").value = cartas.fabricante;
    document.getElementById("inputDataLancamento").value = cartas.dataLancamento;
    document.getElementById("inputMemoriaRAM").value = cartas.memoriaRAM;
    document.getElementById("inputMemoriaROM").value = cartas.memoriaROM;
    document.getElementById("inputPreco").value = cartas.preco;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputMarca").value = "";
    document.getElementById("inputModelo").value = "";
    document.getElementById("inputFabricante").value = "";
    document.getElementById("inputDataLancamento").value = "";
    document.getElementById("inputMemoriaRAM").value = "";
    document.getElementById("inputMemoriaROM").value = "";
    document.getElementById("inputPreco").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputMarca").readOnly = soLeitura;
    document.getElementById("inputModelo").readOnly = soLeitura;
    document.getElementById("inputFabricante").readOnly = soLeitura;
    document.getElementById("inputDataLancamento").readOnly = soLeitura;
    document.getElementById("inputMemoriaRAM").readOnly = soLeitura;
    document.getElementById("inputMemoriaROM").readOnly = soLeitura;
    document.getElementById("inputPreco").readOnly = soLeitura;
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
    document.getElementById("inputId").focus();
}

