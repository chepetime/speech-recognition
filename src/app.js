const startApp = () => {
  const startButton = document.querySelectorAll(".js-start-listen");
  const resultsBox = document.querySelectorAll(".js-result");
  const resultsStepsBox = document.querySelectorAll(".js-result-steps");

  const state = {
    started: false,
    results: [],
  };

  let speech = "";

  let recognition =
    new webkitSpeechRecognition() ||
    root.mozSpeechRecognition ||
    root.msSpeechRecognition ||
    root.oSpeechRecognition ||
    root.SpeechRecognition;

  recognition.continuous = true;
  recognition.interimResults = true;

  const log = (text) => console.log(text);

  recognition.onstart = () => log("Start");

  recognition.onend = () => log("End");

  recognition.onaudiostart = () => log("Audio Start");

  recognition.onaudioend = () => log("Audio End");

  recognition.onsoundstart = () => log("Sound Start");

  recognition.onsoundend = () => log("Sound End");

  recognition.onspeechstart = () => log("Speech Start");

  recognition.onspeechend = () => log("Speech End");

  recognition.onresult = ({ results, resultIndex }) => {
    let fullTranscript = "";

    for (let i = resultIndex; i < results.length; ++i) {
      fullTranscript += results[i][0].transcript;
    }

    resultsStepsBox[0].innerText += fullTranscript.trim() + "\n";

    resultsBox[0].innerText = fullTranscript.trim();
  };

  recognition.onerror = () => log("Error!");

  recognition.onnomatch = () => log("No match!");

  function startRecording() {
    recognition.start();
  }

  startButton[0].addEventListener("click", () => {
    if (state.started) return false;
    startButton[0].innerText = "Listening…";
    state.started = true;
    startRecording();
  });
};

document.addEventListener("DOMContentLoaded", () => startApp());
