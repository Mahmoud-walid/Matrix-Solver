import { app } from "../helpers.js";

const TTSView = function () {};

TTSView.prototype.readSelectedText = function () {
  app.addEventListener("select", function () {
    setTimeout(() => {
      speechSynthesis.cancel();

      if (getSelectedText() !== "") {
        const speech = new SpeechSynthesisUtterance();
        speech.text = getSelectedText();
        speech.voice = speechSynthesis.getVoices()[0];
        speechSynthesis.speak(speech);
      }
    }, 1000);
  });

  const getSelectedText = () => {
    let text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
      text = document.selection.createRange().text;
    }
    return text;
  };
};

export default new TTSView();
