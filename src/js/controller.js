"use strict";
import { addElementsToMatrix } from "./model.js";
import { generateMarkupInputs } from "./model.js";
import { userInputsUl } from "./helpers.js";
import { numMatInputs } from "./helpers.js";

const init = function() {
  generateMarkupInputs(2);
  addElementsToMatrix();
};

userInputsUl.addEventListener("keydown", event => {
  // prettier-ignore
  if ((event.key === "Enter" || /^[0-9]$/.test(event.key)) && !event.ctrlKey && !event.altKey) {
        if (event.key === "Enter") {
          event.preventDefault();
          addElementsToMatrix();
        }
      }
});

numMatInputs.addEventListener("keydown", event => {
  try {
    // prettier-ignore
    if ((event.key === "Enter" || /^[0-9]$/.test(event.key)) && !event.ctrlKey && !event.altKey) {
        if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault();
          generateMarkupInputs(+numMatInputs.value);
          if (isNaN(generateMarkupInputs().N)) throw Error(`"${numMatInputs.value}" isn't a number`)
          if (generateMarkupInputs().N <= 1) throw Error(`can't create matrix with "${generateMarkupInputs().N}" Rows`);
        }
      }
  } catch (error) {
    console.error(error);
    userInputsUl.innerHTML = error.message;
  }
});

init();
