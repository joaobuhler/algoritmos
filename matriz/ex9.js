function MaiorNum(matriz) {
  let mv = matriz[0][0];
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[0].length; j++) {
      if (matriz[i][j] > mv) {
        mv = matriz[i][j];
      }
    }
    
  }
  return mv;
}

function MenorNum(matriz) {
  let m = matriz[0][0];
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[0].length; j++) {
      if (matriz[i][j] < m) {
        m = matriz[i][j];
      }
    }
    
  }
  
  return m;
}
let matriz = [
  [8, 1, 3, 7, 4],
  [5, 3, 1, 9, 2],
  [4, 6, 7, 5, 4],
];
let r = MaiorNum(matriz);
let p = MenorNum(matriz);

console.log(p, r);
