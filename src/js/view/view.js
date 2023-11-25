import model from "../model/model.js";
import switchContainer from "./darkButtonView.js";
import {
  userInputsUl,
  numMatInputs,
  numMatInputsCols,
  app,
} from "../helpers.js";
import { NUM_ROWS, NUM_COLS } from "../config.js";
import solveMatrix from "../model/modelMatrixSolver.js";

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
          solveMatrix(model.addElementsToMatrix().arr);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

view.prototype.numMatInputsHandler = function () {
  numMatInputs.focus();
  [numMatInputs, numMatInputsCols].forEach((ele) =>
    ele.addEventListener("keydown", (event) => {
      try {
        // prettier-ignore
        if (
          (event.key === "Enter" || /^[0-9]$/.test(event.key)) &&
          !event.ctrlKey &&
          !event.altKey
        ) {
          if (event.key === "Enter" || event.key === "Tab") {
            event.preventDefault();
            model.generateMarkupInputs(NUM_ROWS(), NUM_COLS());
            if (isNaN(model.generateMarkupInputs().NR))
              throw Error(`"${NUM_ROWS() || numMatInputs.value}" isn't a number`);

            if (isNaN(model.generateMarkupInputs().NC))
              throw Error(`"${NUM_COLS() || numMatInputsCols.value}" isn't a number`);

            if (model.generateMarkupInputs().NC <= 0 || model.generateMarkupInputs().NC > 600)
              throw Error(`can't create matrix with "${model.generateMarkupInputs().NC}" Cols`);

            if (model.generateMarkupInputs().NR <= 0 ||model.generateMarkupInputs().NR > 600)
              throw Error(`can't create matrix with "${model.generateMarkupInputs().NR}" Rows`);
          }
        }
      } catch (error) {
        console.error(error);
        userInputsUl.innerHTML = error.message;
        //   if (error instanceof Error && error.name === 'BadAllocError') console.error(error);
      }
    })
  );
};

view.prototype.moveInputsArrowsHandler = function () {
  try {
    app.addEventListener("keydown", (event) => {
      const focusedElement = document.activeElement;
      const focusableElements = app.querySelectorAll("button, input");
      const currentIndex =
        Array.from(focusableElements).indexOf(focusedElement);

      if (event.key === "ArrowRight" || event.key === "Enter") {
        const nextIndex = (currentIndex + 1) % focusableElements.length;
        const nextElement = focusableElements[nextIndex];
        nextElement.focus();
      }

      if (event.key === "ArrowLeft" || event.key === "Enter") {
        const prevIndex =
          (currentIndex - 1 + focusableElements.length) %
          focusableElements.length;
        const prevElement = focusableElements[prevIndex];
        prevElement.focus();
      }
      if (event.key === "ArrowUp" || event.key === "Enter") {
        const rowLength = NUM_COLS();
        const aboveIndex =
          (currentIndex - rowLength + focusableElements.length) %
          focusableElements.length;
        const aboveElement = focusableElements[aboveIndex];
        aboveElement.focus();
      }

      if (event.key === "ArrowDown" || event.key === "Enter") {
        console.log(NUM_ROWS());
        const rowLength = NUM_COLS();
        const belowIndex =
          (currentIndex + rowLength) % focusableElements.length;
        const belowElement = focusableElements[belowIndex];
        belowElement.focus();
      }
    });
  } catch (error) {
    console.error(error);
  }
};

view.prototype.darkButtonInsert = function () {
  app.insertAdjacentElement("beforebegin", switchContainer);
};

export default new view();
