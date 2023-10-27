"use strict";

const userInputsUl = document.querySelector(".App .userInputs ul");
const numMatInputs = document.querySelector(".inputNumRows");
const generateMarkupInputs = (N = 2) => {
  try {
    if (N <= 1) throw Error(`can't create matrix with ${N} Rows`);
    userInputsUl.innerHTML = ``;

    for (let i = 0; i < N; i++) {
      const li = document.createElement("li");

      for (let j = 0; j < N + 1; j++) {
        const input = document.createElement("input");
        li.appendChild(input);
        input.classList.add(`inputMat`, `column${j + 1}`, `Row${i + 1}`);
        input.setAttribute("type", "text");
      }
      userInputsUl.appendChild(li);
    }
    console.log(userInputsUl);
  } catch (error) {
    console.error(error);
    userInputsUl.innerHTML = error.message;
  }
};
generateMarkupInputs(2);

const addElementsToMatrix = () => {
  const arr = new Array(+numMatInputs.value * (+numMatInputs.value + 1));
  document.querySelectorAll("input.inputMat").forEach(ele => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] += +ele.value;
    }
  });
  console.log(arr);
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
  // prettier-ignore
  if ((event.key === "Enter" || /^[0-9]$/.test(event.key)) && !event.ctrlKey && !event.altKey) {
    if (event.key === "Enter") {
    event.preventDefault();
      generateMarkupInputs(+numMatInputs.value);
    }
  }
});
