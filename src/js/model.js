import { userInputsUl } from "./helpers.js";
import { numMatInputs } from "./helpers.js";

export const generateMarkupInputs = (N = +numMatInputs.value) => {
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
export const addElementsToMatrix = () => {
  try {
    // const N = +numMatInputs.value;
    const N = generateMarkupInputs().N;
    console.log(N);
    let arr = [];
    let row = [];
    document.querySelectorAll("input.inputMat").forEach((ele, index) => {
      row.push(+ele.value);
      console.log(ele.value, index);
      if ((index + 1) % (N + 1) === 0) {
        arr.push(row);
        row = [];
      }
    });
    console.log(arr);
    return arr;
  } catch (error) {
    console.error(error);
    userInputsUl.innerHTML = error.message;
  }
};
