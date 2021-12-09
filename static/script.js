// const socket = io();
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = 'ro-RO';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

hints.innerHTML = 'Apasa/click pe suprafata ecranului iar la semnalul sonor formuleaza comanda dorita. De exemplu: "Seteaza temperatura din living la 22 de grade"';

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a command.');
}



recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var text = event.results[0][0].transcript;
  diagnostic.textContent = text + '.';
  bg.style.backgroundColor = text;
  console.log(text);
  console.log('Confidence: ' + event.results[0][0].confidence);
  readOutLoud(text);
  // socket.on('connect', () => {
  //   socket.emit("message", event.results[0][0].transcript);
  // });
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

function readOutLoud(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = message.toString();
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  speech.lang = 'ro-RO';

  window.speechSynthesis.speak(speech);
}
