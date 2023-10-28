import { solutionOutput } from "../helpers.js";

const solutionMatView = function () {};

solutionMatView.prototype.generateSolution = function (arr) {
  try {
    solutionOutput.innerHTML = ``;
    arr.forEach((row, rowIndex) => {
      const rowDiv = document.createElement("div");
      rowDiv.textContent = `Solution for row ${rowIndex + 1}: `;

      row.forEach((element, columnIndex) => {
        const elementSpan = document.createElement("span");
        elementSpan.textContent = `Element ${columnIndex + 1}: ${element}`;
        rowDiv.appendChild(elementSpan);
      });

      solutionOutput.appendChild(rowDiv);
    });
  } catch (error) {
    console.error(error);
  }
};

export default new solutionMatView();
