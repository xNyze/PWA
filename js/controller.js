/**
 * creating eventlisteners for elements intended for user interaction
 */
var buttons = document.querySelectorAll("[id*=Button]");
buttons.forEach(function(button) {
  button.addEventListener("click", nextNote);
});

/**
 * sets progressbar to calculated value after each answer
 * mode: string
 */
function progressBar(mode) {
  var stepSize = 0;
  switch (mode) {
    case "leicht":
      stepSize = 25;
      break;

    case "mittel":
      stepSize = 12.5;
      break;

    case "schwer":
      stepsize = 10;
      break;
  }
  document.querySelector("#progress").value += stepSize;
}

function statistic() {}

function nextNote() {
  var modes = document.querySelectorAll("[id*=Mode]");
  var mode = modes.forEach(function(mode) {
    if (mode.checked) {
      return mode.textContent;
    }
  });
  progressBar(mode);
}
