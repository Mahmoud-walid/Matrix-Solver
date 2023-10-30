"use strict";
import model from "./model/model.js";
import view from "./view/view.js";
import { NUM_ROWS } from "./config.js";

const init = function () {
  model.generateMarkupInputs(2, 4);
  model.addElementsToMatrix();
  view.userInputsHandler();
  view.numMatInputsHandler();
};

init();
