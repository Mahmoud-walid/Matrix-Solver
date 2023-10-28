"use strict";
import model from "./model/model.js";
import view from "./view/view.js";
import { NUM_ROWS } from "./config.js";
// import solutionMatView from "./view/solutionMatView.js";

const init = function () {
  model.generateMarkupInputs(2);
  model.addElementsToMatrix();
  view.userInputsHandler();
  view.numMatInputsHandler();
  // solutionMatView.generateSolution(model.addElementsToMatrix().arr);
};

init();
