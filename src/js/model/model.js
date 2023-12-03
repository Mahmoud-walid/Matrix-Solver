import { userInputsUl } from "../helpers.js";
import { NUM_ROWS, NUM_COLS } from "../config.js";
import { random } from "../config.js";
import { solutionOutput } from "../helpers.js";

const generateMarkupInputs = (NR = NUM_ROWS(), NC = NUM_COLS() + 1) => {
  try {
    // if (NR <= 1 || NC <= 1) throw Error(`can't create matrix with ${NR} Rows and ${NC} Columns`);
    userInputsUl.innerHTML = ``;

    for (let i = 0; i < NR; i++) {
      const li = document.createElement("li");

      for (let j = 0; j < NC; j++) {
        const input = document.createElement("input");
        li.appendChild(input);
        input.classList.add(`inputMat`, `column${j + 1}`, `Row${i + 1}`);
        input.setAttribute("placeholder", `r${i + 1}c${j + 1}`);
        input.setAttribute("value", `${random(9, -9)}`); // set default values
        input.setAttribute("type", "text");
      }
      userInputsUl.appendChild(li);
    }
    console.log(userInputsUl);
    return { NR, NC };
  } catch (error) {
    console.error(error);
    userInputsUl.innerHTML = error.message;
  }
};

// ⭐
const addElementsToMatrix = () => {
  try {
    const NR = NUM_ROWS();
    const NC = NUM_COLS() + 1;
    let arr = [];
    let row = [];
    document.querySelectorAll("input.inputMat").forEach((ele, index) => {
      row.push(parseFloat(ele.value) || 0);
      if ((index + 1) % NC === 0) {
        arr.push(row);
        row = [];
      }
    });
    console.log(arr);
    console.log("----------------------------");
    return { arr, NR, NC };
  } catch (error) {
    console.error(error);
    userInputsUl.innerHTML = error.message;
  }
};

const selectElement = (element) => {
  if (element.tagName.toLowerCase() === "input") {
    // ⭐
    setTimeout(() => {
      element.focus();
      element.setSelectionRange(0, element.value.length);
    }, 0);
  } else {
    element.focus();
  }
};

function concatenateWithIdentity(matrix) {
  try {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    if (numRows !== numCols) {
      throw new Error("Input matrix must be square");
    }
    const identityMatrix = Array.from({ length: numRows }, (_, i) =>
      Array.from({ length: numRows }, (_, j) => (i === j ? 1 : 0))
    );
    const resultMatrix = matrix.map((row, i) => row.concat(identityMatrix[i]));

    if (determinant(matrix) === 0) throw Error("No Inverse, Cauze determinant = 0")
    console.log(resultMatrix);
    return resultMatrix;
  } catch (error) {
    console.error(error);
    solutionOutput.innerHTML = error.message
  }
}

export const determinant = (array) =>
  array.length == 1
    ? array[0][0]
    : array.length == 2
    ? array[0][0] * array[1][1] - array[0][1] * array[1][0]
    : array[0].reduce(
        (r, e, i) =>
          r +
          (-1) ** (i + 2) *
            e *
            determinant(array.slice(1).map((c) => c.filter((_, j) => i != j))),
        0
      );

const model = {
  generateMarkupInputs,
  addElementsToMatrix,
  selectElement,
  concatenateWithIdentity,
  determinant,
};

export default model;
