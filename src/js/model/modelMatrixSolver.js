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

  console.log("Final Solution:");
  const finalSolutionBox = document.createElement("div");
  finalSolutionBox.classList.add("finalSolutionBox");
  const finalSolutionTitle = document.createElement("h4");
  finalSolutionTitle.classList.add("finalSolutionTitle");
  finalSolutionTitle.innerText = `Final Solution:`;
  finalSolutionBox.append(finalSolutionTitle);

  const solution = solutionSteps[solutionSteps.length - 1].matrix.map(
    (row) => row[row.length - 1]
  );

  let solutionType;
  if (solution.every((value) => value === 0)) {
    solutionType = "infinite-solutions";
  } else if (solution.every((value) => value !== 0)) {
    solutionType = "one-solution";
  } else {
    solutionType = "no-solution";
  }

  if (solutionType === "no-solution") {
    throw new Error("The system has no solution.");
  } else if (solutionType === "infinite-solutions") {
    throw new Error("The system has infinite solutions.");
  } else {
    solution.forEach((ele, index) => {
      const solutionPara = document.createElement("p");
      solutionPara.innerHTML = `<math><mi>x</mi></math>${
        index + 1
      } ---> ${ele}`;
      finalSolutionBox.appendChild(solutionPara);
    });
    solutionOutput.insertAdjacentElement("beforeend", finalSolutionBox);
  }
}

export default solveMatrix;

// export default solveMatrix;

// exportToExcel(matrix, solutionSteps, solution);

// function exportToExcel(matrix, solutionSteps, finalSolution) {
//   const data = [];

//   // Add the matrix
//   data.push(["Matrix"]);
//   for (const row of matrix) {
//     data.push(row);
//   }

//   // Add the solution steps
//   data.push([]); // Add an empty row for separation
//   data.push(["Solution Steps"]);
//   for (const step of solutionSteps) {
//     data.push(...step);
//     data.push([]); // Add an empty row between steps
//   }

//   // Add the final solution
//   data.push(["Final Solution"]);
//   data.push(finalSolution);

//   // Create a new workbook
//   const wb = XLSX.utils.book_new();
//   const ws = XLSX.utils.aoa_to_sheet(data);
//   XLSX.utils.book_append_sheet(wb, ws, "Matrix_Solution");

//   // Export to Excel file
//   XLSX.writeFile(wb, "matrix_solution.xlsx");
// }

// Example matrix
// const matrix = [
//   [3.0, 2.0, -4.0, 3.0],
//   [2.0, 3.0, 3.0, 15.0],
//   [5.0, -3, 1.0, 14.0],
// ];
// solveMatrix(matrix);
