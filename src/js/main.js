
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


