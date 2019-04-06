/**
 * creating eventlisteners for elements intended for user interaction
 */
var buttons = document.querySelectorAll("[id*=Button]");
buttons.forEach(function(button) {
  button.addEventListener("click", nextNote);
});

/**
 * helper function that sets progressbar to value set according to the chosen mode after each answer
 * mode: string
 * return: none
 */
function progressBar(mode) {
  var stepSize = 0;
  switch (mode) {
    case "easyMode":
      stepSize = 25;
      break;

    case "mediumMode":
      stepSize = 12.5;
      break;

    case "hardMode":
      stepSize = 10;
      break;
  }
  document.querySelector("#progress").value += stepSize;
}

/**
 * helper function that handles statistics after each answer
 * mode: string
 * return: none
 */
function statistic(mode) {
  var points = 0;
  switch (mode) {
    case "easyMode":
      points = 1;
      break;

    case "mediumMode":
      points = 3;
      break;

    case "hardMode":
      points = 5;
      break;
  }
}

/**
 * sets up new Note, calls all helper functions
 * return: none
 */
function nextNote() {
  var modes = document.querySelectorAll("[id*=Mode]");
  let chosenMode;
  modes.forEach(function(mode) {
    if (mode.checked) {
      chosenMode = mode.id;
    }
  });
  progressBar(chosenMode);
  statistic(chosenMode);
}
