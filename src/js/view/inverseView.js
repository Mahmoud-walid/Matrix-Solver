import { inverseBtn } from "../helpers.js";
import model from "../model/model.js";
import solveMatrix from "../model/modelMatrixSolver.js";
import { solutionOutput } from "../helpers.js";

const InverseView = function () {};

InverseView.prototype.inverseBtnHandler = function () {
  let turnOn = false;
  inverseBtn.addEventListener("click", () => {
    if (!turnOn) {
      turnOn = true;
      inverseBtn.style.color = "green";
      const addIdent = model.concatenateWithIdentity(
        model.addElementsToMatrix().arr
      );
      solveMatrix(addIdent);
      displayMatrixInTable(addIdent);
    } else {
      turnOn = false;
      inverseBtn.style.color = "";
      solutionOutput.innerHTML = ``;
    }
  });
};
function displayMatrixInTable(matrix) {
  const table = document.createElement("table");

  for (const row of matrix) {
    const tableRow = document.createElement("tr");
    const middleIndex = Math.floor(row.length / 2);

    for (let i = middleIndex; i < row.length; i++) {
      const tableCell = document.createElement("td");
      tableCell.textContent = row[i];
      tableRow.appendChild(tableCell);
    }

    table.appendChild(tableRow);
  }

  const lastStateBox = document.querySelector(".last-state-box");
  const elementsAfterFirst = Array.from(lastStateBox.children).slice(1);

  elementsAfterFirst.forEach((element) => {
    element.remove();
  });

  lastStateBox.appendChild(table);
}

export default new InverseView();
