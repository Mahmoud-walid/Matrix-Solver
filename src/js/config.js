import { numMatInputs, numMatInputsCols } from "./helpers.js";
export const NUM_ROWS = () => +numMatInputs.value || 2;
export const NUM_COLS = () => +numMatInputsCols.value || 4;

numMatInputs.addEventListener("input", () => {
  // Notify any components or functions that depend on NUM_ROWS that it has changed
  // For example, you might emit a custom event or update components as needed.
  const event = new Event("numRowsChanged");
  window.dispatchEvent(event);
});

numMatInputsCols.addEventListener("input", () => {
  const event = new Event("numRowsChanged");
  window.dispatchEvent(event);
});

export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}