class Pessoas {
    constructor(cpf, nome, dataNascimento, altura) {
        this.cpf = cpf
        this.nome = nome
        this.dataNascimento = dataNascimento
        this.altura = altura
    }

}


    let ListaDePessoas = [];
ListaDePessoas.push(new Pessoas("123", "joão", "2008-07-26", "1,70"))
ListaDePessoas.push(new Pessoas("124", "ana julia", "2007-02-19", "1,53"))
ListaDePessoas.push(new Pessoas("125", "mariAntonia", "2024-05-19", "1,60"))
ListaDePessoas.push(new Pessoas("126", "MEDASUACOISINHA0800", "2022-08-22", "1,60"))



console.log(ListaDePessoas)
console.log(ListaDePessoas[1])

function Altura(ListaDePessoas){
    let altura = []
    for (let i = 0; i < ListaDePessoas.length; i++) {
    
        
    }
}