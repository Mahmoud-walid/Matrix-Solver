import model from "../model.js";
import { userInputsUl } from "../helpers.js";
import { numMatInputs } from "../helpers.js";

const view = function () {};

view.prototype.userInputsHandler = function () {
  userInputsUl.addEventListener("keydown", (event) => {
    if (
      (event.key === "Enter" || /^[0-9]$/.test(event.key)) &&
      !event.ctrlKey &&
      !event.altKey
    ) {
      if (event.key === "Enter") {
        event.preventDefault();
        model.addElementsToMatrix();
        console.log(model.addElementsToMatrix().arr);
      }
    }
  });
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
          model.generateMarkupInputs(+numMatInputs.value);
          if (isNaN(model.generateMarkupInputs().N))
            throw Error(`"${numMatInputs.value}" isn't a number`);
          if (model.generateMarkupInputs().N <= 1 || model.generateMarkupInputs().N > 250)
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
