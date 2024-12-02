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
        const id = parseInt(document.getElementById("inputId").value);
        if(procurePorChavePrimaria(id)!==null){
            alert("erro")
            
        }else{
            bloquearAtributos(false);
            visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
            oQueEstaFazendo = 'inserindo';
            mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
            document.getElementById("inputId").focus();
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
        let id;
        if (cartas == null) {
            id = parseInt(document.getElementById("inputId").value);
        } else {
            id = cartas.id;
        }
    
        const nome = document.getElementById("inputNome").value;
        const nivel = parseInt(document.getElementById("inputNivel").value);
        const raridade = document.getElementById("inputRaridade").value;
        const dataLancamento = document.getElementById("inputDataLancamento").value;
        const vida = parseInt(document.getElementById("inputVida").value);
        const dano = parseInt(document.getElementById("inputDano").value);
        const elixir = document.getElementById("inputElixir").value;
    
        if (id && nome && nivel && raridade && dataLancamento && vida && dano && elixir) {
            switch (oQueEstaFazendo) {
                case 'inserindo':
                    cartas = new Cartas(id, nome, nivel, raridade, dataLancamento, vida, dano, elixir);
                    listaCartas.push(cartas);
                    mostrarAviso("Inserido na lista");
                    break;
                case 'alterando':
                    cartasAlterado = new Cartas(id, nome, nivel, raridade, dataLancamento, vida, dano, elixir);
                    listaCartas[cartas.posicaoNaLista] = cartasAlterado;
                    mostrarAviso("Alterado");
                    break;
                case 'excluindo':
                    listaCartas.splice(cartas.posicaoNaLista, 1);
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
                linha.id+" - " +
                linha.nome+" - " +
                linha.nivel+" - " +
                linha.raridade+" - " +
                linha.dataLancamento+" - " +
                linha.vida+" - " +
                linha.dano+" - " +
                linha.elixir+"<br>";
        }
        return texto;
    }

    function adicionarCartasLista() {
        listaCartas = []
        let linha = new Cartas(1, "Cavaleiro", 14, "Comum", "2023-01-13", 2339, 267, 3);
        listaCartas.push(linha);

        linha = new Cartas(2, "Mineiro", 13, "Lendário", "2023-07-08", 1460, 233, 3);
        listaCartas.push(linha);

        linha = new Cartas(3,"Pekka", 11, "Épica", "2022-09-22", 3760, 816, 7 );
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
        document.getElementById("inputNome").value = cartas.nome;
        document.getElementById("inputNivel").value = cartas.nivel;
        document.getElementById("inputRaridade").value = cartas.raridade;
        document.getElementById("inputDataLancamento").value = cartas.dataLancamento;
        document.getElementById("inputVida").value = cartas.vida;
        document.getElementById("inputDano").value = cartas.dano;
        document.getElementById("inputElixir").value = cartas.elixir;

        document.getElementById("rangeValue").textContent = cartas.elixir;  
        // Define os campos como readonly
        bloquearAtributos(true);
    }

    // Função para limpar os dados dos campos
    function limparAtributos() {
        document.getElementById("inputNome").value = "";
        document.getElementById("inputNivel").value = "";
        document.getElementById("inputRaridade").value = "";
        document.getElementById("inputDataLancamento").value = "";
        document.getElementById("inputVida").value = "";
        document.getElementById("inputDano").value = "";
        document.getElementById("inputElixir").value = "";

        bloquearAtributos(true);
    }

    function bloquearAtributos(soLeitura) {
        //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
        document.getElementById("inputId").readOnly = !soLeitura;
        document.getElementById("inputNome").readOnly = soLeitura;
        document.getElementById("inputNivel").readOnly = soLeitura;
        document.getElementById("inputRaridade").readOnly = soLeitura;
        document.getElementById("inputDataLancamento").readOnly = soLeitura;
        document.getElementById("inputVida").readOnly = soLeitura;
        document.getElementById("inputDano").readOnly = soLeitura;
        document.getElementById("inputElixir").readOnly = soLeitura;
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

    function salvarListaNoLocalStorage() {
        localStorage.setItem("listaCartas", JSON.stringify(listaCartas));
    }

    function carregarListaDoLocalStorage() {
        const listaSalva = localStorage.getItem("listaCartas");
        if (listaSalva) {
            listaCartas = JSON.parse(listaSalva); // Converte a string JSON de volta para um array
        } else {
            adicionarCartasLista(); // Cria a lista inicial caso não exista no Local Storage
        }
    }
    window.onload = function() {
        carregarListaDoLocalStorage(); // Carrega os dados do Local Storage ao carregar a página
        listar(); // Atualiza a interface com os dados carregados
    };
        
    