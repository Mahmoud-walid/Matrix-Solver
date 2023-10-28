"use strict";
let N = 3;

function gaussianElimination(mat) {
  let singular_flag = forwardElim(mat);

  if (singular_flag != -1) {
    console.log("Singular Matrix.");

    if (mat[singular_flag][N]) console.log("Inconsistent System.");
    else console.log("May have infinitely many solutions.");

    return;
  }

  backSub(mat);
}

function swap_row(mat, i, j) {
  for (let k = 0; k <= N; k++) {
    let temp = mat[i][k];
    mat[i][k] = mat[j][k];
    mat[j][k] = temp;
  }
}

function print(mat) {
  for (let i = 0; i < N; i++, console.log(""))
    for (let j = 0; j <= N; j++) console.log("" + mat[i][j].toFixed(2));

  console.log("--------------------------");
}

function forwardElim(mat) {
  for (let k = 0; k < N; k++) {
    let i_max = k;
    let v_max = mat[i_max][k];

    for (let i = k + 1; i < N; i++)
      if (Math.abs(mat[i][k]) > v_max) (v_max = mat[i][k]), (i_max = i);

    if (!mat[k][i_max]) return k;

    if (i_max != k) swap_row(mat, k, i_max);

    for (let i = k + 1; i < N; i++) {
      let f = mat[i][k] / mat[k][k];

      for (let j = k + 1; j <= N; j++) mat[i][j] -= mat[k][j] * f;

      mat[i][k] = 0;
    }

    print(mat);
  }
  print(mat);
  return -1;
}

function backSub(mat) {
  let x = new Array(N);

  for (let i = N - 1; i >= 0; i--) {
    x[i] = mat[i][N];

    for (let j = i + 1; j < N; j++) {
      x[i] -= mat[i][j] * x[j];
    }

    x[i] = Math.round(x[i] / mat[i][i]);
  }

  console.log("\nSolution for the system:");
  for (let i = 0; i < N; i++) console.log(x[i].toFixed(8));
}

// prettier-ignore
// let mat = [
//     [3.0, 2.0, -4.0, 3.0],
//     [2.0, 3.0, 3.0, 15.0],
//     [5.0, -3, 1.0, 14.0]
//     ];
let mat = addElementsToMatrix().arr;

gaussianElimination(mat);
