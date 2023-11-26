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
        explanation: `↥ Step ${solutionSteps.length + 1}: ${1 / pivotValue}R${
          pivotRow + 1
        } --> R${pivotRow + 1}`,
      });
    }

    for (let row = 0; row < numRows; row++) {
      if (row !== pivotRow && matrix[row][pivotRow] !== 0) {
        const factor = -matrix[row][pivotRow];
        addRows(row, pivotRow, factor);
        solutionSteps.push({
          matrix: matrix.map((row) => row.slice()),
          explanation: `↥ Step ${solutionSteps.length + 1}: ${factor}R${
            pivotRow + 1
          } + R${row + 1} --> R${row + 1}`,
        });
      }
    }
  }

  return solutionSteps;
}

function printSolutionSteps(solutionSteps) {
  const solutionStepsBox = document.createElement("div");
  solutionStepsBox.classList.add("solution-steps");

  let lastPrintedMatrix = null;

  solutionSteps.forEach((step, index) => {
    const stepContainer = document.createElement("div");
    stepContainer.classList.add("step-container");

    const numberStep = document.createElement("h4");
    numberStep.innerText = `${step.explanation}`;

    const table = document.createElement("table");

    const currentMatrix = JSON.stringify(step.matrix);
    if (currentMatrix !== lastPrintedMatrix) {
      lastPrintedMatrix = currentMatrix;

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
    }
  });

  solutionOutput.innerHTML = ``;
  solutionOutput.appendChild(solutionStepsBox);
}

function isHomogeneous(matrix) {
  return matrix.every((row) => row[row.length - 1] === 0);
}

export function solveMatrix(matrix) {
  const solutionSteps = gaussJordan(matrix);

  console.log("Solution Steps:");
  const solutionStepsTitle = document.createElement("h4");
  solutionStepsTitle.classList.add("solutionStepsTitle");
  solutionStepsTitle.innerText = `Solution Steps:`;
  solutionOutput.insertAdjacentElement("afterbegin", solutionStepsTitle);
  printSolutionSteps(solutionSteps);

  if (isHomogeneous(matrix)) {
    console.log("Homogeneous System");
    const homogeneousBox = document.createElement("div");
    homogeneousBox.classList.add("homogeneous-box");

    const homogeneousTitle = document.createElement("h4");
    homogeneousTitle.classList.add("homogeneous-title");
    homogeneousTitle.innerText = "Homogeneous System";
    homogeneousBox.appendChild(homogeneousTitle);

    solutionOutput.insertAdjacentElement("beforeend", homogeneousBox);
    return;
  }

  let solutionType;
  if (
    matrix.some(
      (row) =>
        row.slice(0, row.length - 1).every((value) => value === 0) &&
        row[row.length - 1] !== 0
    )
  ) {
    solutionType = "no-solution";
    solutionOutput.insertAdjacentText("afterend", "no-solution");
  } else if (
    matrix.some((row) =>
      row.slice(0, row.length - 1).every((value) => value === 0)
    )
  ) {
    solutionType = "infinite-solutions";
    solutionOutput.insertAdjacentText("afterend", "infinite-solutions");
  } else {
    solutionType = "one-solution";
  }

  if (solutionType === "no-solution") {
    throw new Error("The system has no solution.");
  } else if (solutionType === "infinite-solutions") {
    throw new Error("The system has infinite solutions.");
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
      solutionPara.innerHTML = `<math><mi>x</mi></math>${
        index + 1
      } ---> ${ele}`;
      lastStateBox.appendChild(solutionPara);
    });

    solutionOutput.insertAdjacentElement("beforeend", lastStateBox);
  }
}

export default solveMatrix;
