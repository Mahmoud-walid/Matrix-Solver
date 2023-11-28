import { app } from "../helpers.js";

const TTSView = function () {};

TTSView.prototype.readSelectedText = function () {
  let selectedVoice = speechSynthesis.getVoices()[3];
  let lastSelectedText = "";

  app.addEventListener("select", function () {
    setTimeout(() => {
      if (getSelectedText() !== lastSelectedText) {
        lastSelectedText = getSelectedText();
        speechSynthesis.cancel();

        if (getSelectedText() !== "") {
          const speech = new SpeechSynthesisUtterance();
          speech.text = getSelectedText();
          speech.voice = selectedVoice;
          speechSynthesis.speak(speech);
        }
      }
    }, 1000);
  });

  speechSynthesis.onvoiceschanged = function () {
    selectedVoice = speechSynthesis.getVoices()[3];
  };

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
