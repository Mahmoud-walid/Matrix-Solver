import { userInputsUl } from "./helpers.js";
import { numMatInputs } from "./helpers.js";

const generateMarkupInputs = (N = +numMatInputs.value) => {
  try {
    // if (N <= 1) throw Error(`can't create matrix with ${N} Rows`);
    userInputsUl.innerHTML = ``;

    for (let i = 0; i < N; i++) {
      const li = document.createElement("li");

      for (let j = 0; j < N + 1; j++) {
        const input = document.createElement("input");
        li.appendChild(input);
        input.classList.add(`inputMat`, `column${j + 1}`, `Row${i + 1}`);
        input.setAttribute("placeholder", `r${i + 1}c${j + 1}`);
        input.setAttribute("type", "text");
      }
      userInputsUl.appendChild(li);
    }
    console.log(userInputsUl);
    return { N };
  } catch (error) {
    console.error(error);
    userInputsUl.innerHTML = error.message;
  }
};

// ⭐
const addElementsToMatrix = () => {
  try {
    const N = +numMatInputs.value || 2;
    let arr = [];
    let row = [];
    document.querySelectorAll("input.inputMat").forEach((ele, index) => {
      row.push(parseFloat(ele.value) || 0);
      if ((index + 1) % (N + 1) === 0) {
        arr.push(row);
        row = [];
      }
    });
    console.log(arr);
    return { arr };
  } catch (error) {
    console.error(error);
    userInputsUl.innerHTML = error.message;
  }
};

const gaussianElimination = (mat) => {
  let singular_flag = forwardElim(mat);

  if (singular_flag != -1) {
    console.log("Singular Matrix.");

    if (mat[singular_flag][N]) console.log("Inconsistent System.");
    else console.log("May have infinitely many solutions.");

    return;
  }

  backSub(mat);
};

const model = {
  generateMarkupInputs,
  addElementsToMatrix,
  gaussianElimination,
};

export default model;
