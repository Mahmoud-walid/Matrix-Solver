"use strict";
import { solutionOutput } from "../helpers.js";
let N;

function gaussianElimination(mat) {
  N = mat.length;
  console.log(N);
  let singular_flag = forwardElim(mat);

  if (singular_flag != -1) {
    const stateMatrix = document.createElement("h4")
    const explanMatrix = document.createElement("h5")
    explanMatrix.classList.add(`explanMatrix`)
    stateMatrix.classList.add(`stateMatrix`)
    stateMatrix.innerText = `Singular Matrix.`
    solutionOutput.insertAdjacentElement("beforeend", stateMatrix)
    console.log("Singular Matrix.");

    if (mat[singular_flag][N]) {
      explanMatrix.innerText = `Inconsistent System.`;
      console.log("Inconsistent System.")
    }
    else {
      explanMatrix.innerText = `May have infinitely many solutions`
      console.log("May have infinitely many solutions.")
    };
    solutionOutput.insertAdjacentElement("beforeend", explanMatrix)
    
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
} //

function print(mat) {
  for (let i = 0; i < N; i++, console.log("")) {
    const out = document.createElement("p")
    out.classList.add(`Row`, `R_${i + 1}`)
    document.styleSheets[0].insertRule(`.Row.R_${i + 1}::before {content: "R${i + 1}"}`)
    console.log(out);
    for (let j = 0; j <= N; j++) {
      console.log("" + Math.round(mat[i][j].toFixed(2)));
      const output = document.createElement("p");
      output.classList.add(`Col`, `R_${i + 1}--C_${j + 1}`);
      output.dataset.row = `R_${i + 1}`;
      output.dataset.col = `C_${j + 1}`;
      output.insertAdjacentHTML("beforeend", `${Math.round(mat[i][j].toFixed(2))}`);
      out.insertAdjacentElement("beforeend", output);
      console.log(output);

    }
    solutionOutput.insertAdjacentElement("beforeend", out)
  }
  
  console.log("--------------------------");
} //

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
} //

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
} //

// prettier-ignore
// let mat = [
//     [3.0, 2.0, -4.0, 3.0],
//     [2.0, 3.0, 3.0, 15.0],
//     [5.0, -3, 1.0, 14.0]
//     ];

export default gaussianElimination;
