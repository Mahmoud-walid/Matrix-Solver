import model from "../model/model.js";
import { userInputsUl, numMatInputs } from "../helpers.js";
import { NUM_ROWS } from "../config.js";
import gaussianElimination from "../model/modelMatrixSolver.js";

const view = function () {};

view.prototype.userInputsHandler = function () {
  try {
    userInputsUl.addEventListener("keydown", (event) => {
      if (
        (event.key === "Enter" || /^[0-9]$/.test(event.key)) &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        if (event.key === "Enter") {
          event.preventDefault();
          model.addElementsToMatrix();
          gaussianElimination(model.addElementsToMatrix().arr);
          console.log(model.addElementsToMatrix().arr);
          console.log(gaussianElimination(model.addElementsToMatrix().arr));
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

view.prototype.numMatInputsHandler = function () {
  numMatInputs.addEventListener("keydown", (event) => {
    try {
      if (
        (event.key === "Enter" || /^[0-9]$/.test(event.key)) &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        if (event.key === "Enter" || event.key === "Tab") {
          event.preventDefault();
          model.generateMarkupInputs(NUM_ROWS());
          if (isNaN(model.generateMarkupInputs().N))
            throw Error(`"${NUM_ROWS() || numMatInputs.value}" isn't a number`);
          if (
            model.generateMarkupInputs().N <= 1 ||
            model.generateMarkupInputs().N > 250
          )
            throw Error(
              `can't create matrix with "${
                model.generateMarkupInputs().N
              }" Rows`
            );
        }
      }
    } catch (error) {
      console.error(error);
      userInputsUl.innerHTML = error.message;
      //   if (error instanceof Error && error.name === 'BadAllocError') console.error(error);
    }
  });
};

export default new view();
