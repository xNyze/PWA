var currentProblem = 0;

/**
 * creating eventlisteners for elements intended for user interaction
 */
var buttons = document.querySelectorAll("[id*=Button]");
buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    nextNote(this.id);
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
 * helper function persisting the results in the global statsObject
 * @param {String} mode 
 * @param {String containing only the ID} clickedID 
 */
function statistic(mode, clickedID) {
  var pointsForMode = 0;
  switch (mode) {
    case "easyMode":
      pointsForMode = 1;
      break;

    case "mediumMode":
      pointsForMode = 3;
      break;

    case "hardMode":
      pointsForMode = 5;
      break;
  }

  var problem = {
    "outcome": false, 
    "points": 0,
    "noteObject": noteObject
  };

  if(noteObject.answers[0] === document.getElementById(clickedID).textContent) {
    problem.outcome = true;
    problem.points = pointsForMode;
  }

  statsObject.totalPoints += problem.points;
  statsObject.problems.push(problem);
  console.warn(statsObject);
}

/**
 * sets up new Note, calls all helper functions
 */
function nextNote(clickedID) {
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
  statistic(chosenMode, clickedID);
  if(currentProblem < totalProblems) {
    initNotes(document.querySelector('.keys:checked').id,true);
    changeAnswerBtns();
  } else {
    alert('Congrats you finished the learning program!');
  }
}
