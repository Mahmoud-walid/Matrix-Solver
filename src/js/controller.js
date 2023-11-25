"use strict";
import model from "./model/model.js";
import view from "./view/view.js";
import { NUM_ROWS } from "./config.js";

const init = function () {
  view.darkButtonInsert();
  model.generateMarkupInputs();
  model.addElementsToMatrix();
  view.userInputsHandler();
  view.numMatInputsHandler();
  view.moveInputsArrowsHandler();
};

init();
