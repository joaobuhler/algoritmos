function procureOnumero(num, matriz) {
    let resp = [];
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            if (matriz[i][j] === num) {
                resp.push([i, j]);
            }
        }
    }
    return resp;
}
let matriz = [[8,1,3,7,4],[5,3,1,9,2],[4,6,7,5,4]];
let r = procureOnumero(8,matriz);

console.log(r);