import { userInputsUl } from "../helpers.js";
import { NUM_ROWS, NUM_COLS } from "../config.js";
import { random } from "../config.js";

const generateMarkupInputs = (NR = NUM_ROWS(), NC = NUM_COLS()) => {
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
    const NR = NUM_ROWS() || 2;
    const NC = NUM_COLS() || 2;
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

const model = {
  generateMarkupInputs,
  addElementsToMatrix,
};

export default model;
