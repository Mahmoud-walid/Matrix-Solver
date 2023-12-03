import { inverseBtn } from "../helpers.js";
import model from "../model/model.js";
import solveMatrix from "../model/modelMatrixSolver.js";

const InverseView = function () {};

InverseView.prototype.inverseBtnHandler = function () {
  let turnOn = false;
  inverseBtn.addEventListener("click", () => {
    if (!turnOn) {
      turnOn = true;
      inverseBtn.style.color = "green";
      const addIdent = model.concatenateWithIdentity(
        model.addElementsToMatrix().arr
      );
      solveMatrix(addIdent)
    //   const invertibleSolution = document.createElement("")
    //   document.querySelector(".last-state-box").innerHTML = solveMatrix(addIdent)
    } else {
      turnOn = false;
      inverseBtn.style.color = "";
    }
  });
};

export default new InverseView();
