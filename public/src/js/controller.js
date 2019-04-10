var currentProblem = 0;

/**
 * creating eventlisteners for elements intended for user interaction
 */
var buttons = document.querySelectorAll("[id*=Button]");
buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    changeAnswerBtns();
    nextNote();
  });
});

/**
 * helper function that sets progressbar to value set according to the chosen mode after each answer
 * @param {String} mode 
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
 * @param {String} mode 
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
 */
function nextNote() {
  var modes = document.querySelectorAll("[id*=Mode]");
  var chosenMode;
  modes.forEach(function(mode) {
    if (mode.checked) {
      chosenMode = mode.id;
    }
  });

  var totalProblems;
  currentProblem++;

  switch (chosenMode) {
    case "easyMode":
      totalProblems = 4;
      break;

    case "mediumMode":
      totalProblems = 8;
      break;

    case "hardMode":
      totalProblems = 10;
      break;
  }

  progressBar(chosenMode);
  statistic(chosenMode);
  if(currentProblem < totalProblems) {
    initNotes(document.querySelector('.keys:checked').id,true);
  } else {
    alert('Congrats you finished the learning program!');
  }
}
