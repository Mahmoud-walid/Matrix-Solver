"use strict";

const userInputsUl = document.querySelector(".App .userInputs ul");
const numMatInputs = document.querySelector(".inputNumRows");
const generateMarkupInputs = (N = +numMatInputs.value) => {
  try {
    // if (N <= 1) throw Error(`can't create matrix with ${N} Rows`);
    userInputsUl.innerHTML = ``;

    for (let i = 0; i < N; i++) {
      const li = document.createElement("li");

      for (let j = 0; j < N + 1; j++) {
        const input = document.createElement("input");
        li.appendChild(input);
        input.classList.add(`inputMat`, `column${j + 1}`, `Row${i + 1}`);
        input.setAttribute("placeholder", `r${i + 1}c${j + 1}`);
        input.setAttribute("type", "text");
      }
      userInputsUl.appendChild(li);
    }
    console.log(userInputsUl);
    return { N };
  } catch (error) {
    console.error(error);
    userInputsUl.innerHTML = error.message;
  }
};
generateMarkupInputs(2);

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

// ⭐
const addElementsToMatrix = () => {
  const N = +numMatInputs.value;
  let arr = [];
  let row = [];
  document.querySelectorAll("input.inputMat").forEach((ele, index) => {
    row.push(+ele.value);
    if ((index + 1) % (N + 1) === 0) {
      arr.push(row);
      row = [];
    }
  });
  console.log(arr);
  return arr;
};

//
//
//
const zoomInButton = document.getElementById("zoomInButton");
const zoomOutButton = document.getElementById("zoomOutButton");

zoomInButton.addEventListener("click", () => {
  zoomIn();
});

zoomOutButton.addEventListener("click", () => {
  zoomOut();
});

function zoomIn() {
  document.body.style.zoom =
    parseFloat(getComputedStyle(document.body).zoom) + 0.1;
}

function zoomOut() {
  document.body.style.zoom =
    parseFloat(getComputedStyle(document.body).zoom) - 0.1;
}

document.addEventListener("keydown", e => {
  if (e.ctrlKey) {
    if (e.deltaY < 0) {
      zoomIn();
    } else if (e.deltaY > 0) {
      zoomOut();
    }
  }
});
