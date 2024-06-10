
let inputNota = [];

function calcular() {
    n = document.getElementById("inputNota").value;
    notas = n.split(",").map(Number);
    let media = calcularMedia(notas);
    document.getElementById("resp").innerText = media;
}

function calcularMedia(notas) {
    let soma = 0
    for (let i = 0; i < notas.length; i++) {
        soma = soma + notas[i];
    }

    let media = soma / notas.length;
    return media;
}