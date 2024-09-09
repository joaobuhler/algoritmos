let listaRemedios = [];
adicionarRemedioLista();

function listar(){
    let saida = document.getElementById("resp")
    saida.innerHTML = ""
    for (let i = 0; i < listaRemedios.length; i++) {
        remedio = listaRemedios[i]
        saida.innerHTML +=
            remedio.id + "  -  " +
            remedio.nome + "  -  " +
            remedio.peso + "  -  " +
            remedio.marca + "  -  " +
            remedio.dataFabricaçao + "<br>"
        
    }
}



function adicionarRemedioLista() {
    let linha = new Remedio(1, "Aspirina", 10, "Bayer", "2024-01-13");
    listaRemedios.push(linha);

    linha = new Remedio(2, "AS", 20, "Genérico", "2024-04-11");
    listaRemedios.push(linha);

    linha = new Remedio(3, "Ritalina", 8, "Genérico", "2024-11-20");
    listaRemedios.push(linha);

}