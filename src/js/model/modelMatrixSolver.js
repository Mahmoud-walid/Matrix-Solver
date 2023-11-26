"use strict";
import { solutionOutput } from "../helpers.js";

function gaussJordan(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length - 1;
  const solutionSteps = [];

  const multiplyRow = (row, scalar) =>
    matrix[row].map((element) => element * scalar);

  const addRows = (targetRow, sourceRow, scalar) => {
    matrix[targetRow] = matrix[targetRow].map(
      (element, col) => element + scalar * matrix[sourceRow][col]
    );
  };

  for (let pivotRow = 0; pivotRow < Math.min(numRows, numCols); pivotRow++) {
    let pivotValue = matrix[pivotRow][pivotRow];

    if (pivotValue === 0) {
      let found = false;

      for (let i = pivotRow + 1; i < numRows; i++) {
        if (matrix[i][pivotRow] !== 0) {
          [matrix[pivotRow], matrix[i]] = [matrix[i], matrix[pivotRow]];
          pivotValue = matrix[pivotRow][pivotRow];
          found = true;
          break;
        }
      }

      if (!found) continue;
    }

    solutionSteps.push({
      matrix: matrix.map((row) => row.slice()),
      explanation: `Step ${solutionSteps.length + 1}: Start with the matrix`,
    });

    if (pivotValue !== 1) {
      matrix[pivotRow] = multiplyRow(pivotRow, 1 / pivotValue);
      solutionSteps.push({
        matrix: matrix.map((row) => row.slice()),
        explanation: `Step ${solutionSteps.length + 1}: Multiply row ${
          pivotRow + 1
        } by 1/${pivotValue}`,
      });
    }

    for (let row = 0; row < numRows; row++) {
      if (row !== pivotRow && matrix[row][pivotRow] !== 0) {
        const factor = -matrix[row][pivotRow];
        addRows(row, pivotRow, factor);
        solutionSteps.push({
          matrix: matrix.map((row) => row.slice()),
          explanation: `Step ${
            solutionSteps.length + 1
          }: Add ${factor} times row ${pivotRow + 1} to row ${row + 1}`,
        });
      }
    }
  }

  return solutionSteps;
}

function printSolutionSteps(solutionSteps) {
  const solutionStepsBox = document.createElement("div");
  solutionStepsBox.classList.add("solution-steps");

  solutionSteps.forEach((step, index) => {
    const stepContainer = document.createElement("div");
    stepContainer.classList.add("step-container");

    const numberStep = document.createElement("h4");
    numberStep.innerText = `Step ${index + 1}: ${step.explanation}`;

    const table = document.createElement("table");

    for (const element2 of step.matrix) {
      const row = document.createElement("tr");

      for (const element of element2) {
        const cell = document.createElement("td");
        cell.textContent = element;
        row.appendChild(cell);
      }

      table.appendChild(row);
    }

    stepContainer.appendChild(numberStep);
    stepContainer.appendChild(table);
    solutionStepsBox.appendChild(stepContainer);
  });

  solutionOutput.innerHTML = ``;
  solutionOutput.appendChild(solutionStepsBox);
}

export function solveMatrix(matrix) {
  const solutionSteps = gaussJordan(matrix);

  console.log("Solution Steps:");
  const solutionStepsTitle = document.createElement("h4");
  solutionStepsTitle.classList.add("solutionStepsTitle");
  solutionStepsTitle.innerText = `Solution Steps:`;
  solutionOutput.insertAdjacentElement("afterbegin", solutionStepsTitle);
  printSolutionSteps(solutionSteps);

  let solutionType;
  if (matrix.some(row => row.slice(0, row.length - 1).every(value => value === 0) && row[row.length - 1] !== 0)) {
    solutionType = "no-solution";
  } else if (matrix.every(row => row.slice(0, row.length - 1).every(value => value === 0))) {
    solutionType = "infinite-solutions";
  } else {
    solutionType = "one-solution";
  }

  if (solutionType === "no-solution") {
    throw new Error("The system has no solution.");
  } else if (solutionType === "infinite-solutions") {
    console.log("The system has infinite solutions.");
    const lastStateBox = document.createElement("div");
    lastStateBox.classList.add("last-state-box");

    const lastStateTitle = document.createElement("h4");
    lastStateTitle.classList.add("last-state-title");
    lastStateTitle.innerText = "Final Solution (Homogeneous):";
    lastStateBox.appendChild(lastStateTitle);

    const solutionPara = document.createElement("p");
    solutionPara.innerText = "The system has infinitely many solutions (Homogeneous).";
    lastStateBox.appendChild(solutionPara);

    solutionOutput.insertAdjacentElement("beforeend", lastStateBox);
  } else {
    const lastStateBox = document.createElement("div");
    lastStateBox.classList.add("last-state-box");

    const lastStateTitle = document.createElement("h4");
    lastStateTitle.classList.add("last-state-title");
    lastStateTitle.innerText = "Final Solution:";
    lastStateBox.appendChild(lastStateTitle);

    const solution = solutionSteps[solutionSteps.length - 1].matrix.map(
      (row) => row[row.length - 1]
    );

    solution.forEach((ele, index) => {
      const solutionPara = document.createElement("p");
      solutionPara.innerHTML = `<math><mi>x</mi></math>${index + 1} ---> ${ele}`;
      lastStateBox.appendChild(solutionPara);
    });

    solutionOutput.insertAdjacentElement("beforeend", lastStateBox);
  }
}


export default solveMatrix;
