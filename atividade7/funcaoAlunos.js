let listaAlunos = [];
adicionarAlunoLista();

function listar(){
    let saida = document.getElementById("resp")
    saida.innerHTML = ""
    for (let i = 0; i < listaAlunos.length; i++) {
        alunos = listaAlunos[i]
        saida.innerHTML +=
            alunos.RA + "  -  " +
            alunos.nome + "  -  " +
            alunos.Pbimestre + "  -  " +
            alunos.Sbimestre + "  -  " +
            alunos.Tbimestre + "  -  " +
            alunos.Qbimestre + "<br>"
        
    }
}


function procurarPorRA(RAprocurado, listaAlunos){
    console.log(listaAlunos);
    for (let index = 0; index < listaAlunos.length; index++) {
        if (listaAlunos[index].RA == RAprocurado) {
            return listaAlunos[index];
        }
    }
    return null;
}

function procure(){
    const p = procurarPorRA(document.getElementById('ra').value, listaAlunos);
    if (p) {
        document.getElementById('nome').value = p.nome;
        document.getElementById('Pbimestre').value = p.Pbimestre;
        document.getElementById('Sbimestre').value = p.Sbimestre;
        document.getElementById('Tbimestre').value = p.Tbimestre;
        document.getElementById('Qbimestre').value = p.Qbimestre;
    } else {
        alert("ra não encontrado na lista de pessoas");
    }
}

function Inserir() {

    const raAluno = document.getElementById("ra").value;
    const nomeAluno = document.getElementById("nome").value;
    const Pbimestre = parseFloat(document.getElementById("Pbimestre").value);
    const Sbimestre = parseFloat(document.getElementById("Sbimestre").value);
    const Tbimestre = parseFloat(document.getElementById("Tbimestre").value);
    const Qbimestre = parseFloat(document.getElementById("Qbimestre").value);
   
    let cadastro = new Alunos(raAluno, nomeAluno, Pbimestre, Sbimestre, Tbimestre, Qbimestre);
    
}



function adicionarAlunoLista() {
    let linha = new Alunos(12345, "João Pedro", 10, 9, 10, 8);
    listaAlunos.push(linha);

    linha = new Alunos(56789, "Ana Julia", 10, 10, 10, 10);
    listaAlunos.push(linha);

    linha = new Alunos(23456, "Bruno Shiba", 8, 8, 7, 6);
    listaAlunos.push(linha);

    linha = new Alunos(57947, "Erick", 6, 8, 5, 6);
    listaAlunos.push(linha);

    linha = new Alunos(32245, "Wesley", 6, 6, 6, 6);
    listaAlunos.push(linha);
}