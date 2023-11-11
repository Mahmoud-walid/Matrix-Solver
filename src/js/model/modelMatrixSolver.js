"use strict";
import { solutionOutput } from "../helpers.js";


function gaussianElimination(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length - 1;
  const solutionSteps = [];

  for (let pivotRow = 0; pivotRow < Math.min(numRows, numCols); pivotRow++) {
    let pivotValue = matrix[pivotRow][pivotRow];
    
    // Check for a non-zero pivot value
    if (pivotValue === 0) {
      let found = false;
      // Look for a non-zero pivot in the same column below the current row
      for (let i = pivotRow + 1; i < numRows; i++) {
        if (matrix[i][pivotRow] !== 0) {
          [matrix[pivotRow], matrix[i]] = [matrix[i], matrix[pivotRow]];
          pivotValue = matrix[pivotRow][pivotRow];
          found = true;
          break;
        }
      }
      // If no non-zero pivot is found, move to the next column
      if (!found) continue;
    }

    // Normalize the pivot row
    for (let col = pivotRow; col <= numCols; col++) {
      matrix[pivotRow][col] /= pivotValue;
    }

    // Eliminate other rows
    for (let row = 0; row < numRows; row++) {
      if (row !== pivotRow) {
        const factor = matrix[row][pivotRow];
        for (let col = pivotRow; col <= numCols; col++) {
          matrix[row][col] -= factor * matrix[pivotRow][col];
        }
      }
    }

    // Save the current step
    solutionSteps.push(JSON.parse(JSON.stringify(matrix)));
  }
  
  return solutionSteps;
}

function printSolutionSteps(solutionSteps) {
  const solutionStepsBox = document.createElement("div");
  solutionStepsBox.classList.add("solution-steps");

  for (let step = 0; step < solutionSteps.length; step++) {
    const stepContainer = document.createElement("div");
    stepContainer.classList.add("step-container");

    const numberStep = document.createElement("h4");
    numberStep.innerText = `Step ${step + 1}:`;

    const table = document.createElement("table");

    for (const element2 of solutionSteps[step]) {
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

  solutionOutput.innerHTML = ``
  solutionOutput.appendChild(solutionStepsBox);
}

export function solveMatrix(matrix) {
  const solutionSteps = gaussianElimination(matrix);
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

  const solution = solutionSteps[solutionSteps.length - 1].map(
    (row) => row[row.length - 1]
  );

  // Check for infinite solutions
  if (solution.some(element => isNaN(element) || !isFinite(element))) {
    throw new Error("The system has infinite solutions.");
  } else {
    // Print the final solution
    solution.forEach((ele, index) => {
      const solutionPara = document.createElement("p");
      solutionPara.innerHTML = `<math><mi>x</mi></math>${index + 1} ---> ${isFinite(ele) ? ele : "Infinity"}`;
      finalSolutionBox.appendChild(solutionPara);
    });
    solutionOutput.insertAdjacentElement("beforeend", finalSolutionBox);
  }
}

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

export default solveMatrix;

// Example matrix
// const matrix = [
//   [3.0, 2.0, -4.0, 3.0],
//   [2.0, 3.0, 3.0, 15.0],
//   [5.0, -3, 1.0, 14.0],
// ];
// solveMatrix(matrix);
