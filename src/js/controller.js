"use strict";
import model from "./model.js";
import view from "./view/view.js";

const init = function () {
  model.generateMarkupInputs(2);
  model.addElementsToMatrix();
  view.userInputsHandler();
  view.numMatInputsHandler();
};

init();
