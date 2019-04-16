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
 */
function progressBar() {
  document.querySelector("#progress").value += modeObject.stepSize;
}

/**
 * helper function persisting the results in the global statsObject
 * @param {String containing only the ID} clickedID
 */
function statistic(clickedID) {
  var round = [];

  var problem = {
    "answer": document.getElementById(clickedID).textContent,
    "outcome": document.getElementById(clickedID).textContent == noteObject.answers[0] ? true : false,
    "points": document.getElementById(clickedID).textContent == noteObject.answers[0] ? modeObject.pointsForMode : 0,
    "noteObject": noteObject
  };

  statsObject.totalPoints += problem.points;
  if(modeObject.currentProblem == 0) {
    statsObject.rounds.push(round);
  }
  statsObject.rounds[statsObject.rounds.length-1].push(problem);
}

function setMode() {
  var modes = document.querySelectorAll("[id*=Mode]");
  var chosenMode;
  modes.forEach(function(mode) {
    if (mode.checked) {
      chosenMode = mode.id;
    }
  });

  var totalProblems, stepSize, pointsForMode;

  switch (chosenMode) {
    case "easyMode":
      totalProblems = 4;
      stepSize = 25;
      pointsForMode = 1;
      break;

    case "mediumMode":
      totalProblems = 8;
      stepSize = 12.5;
      pointsForMode = 3;
      break;

    case "hardMode":
      totalProblems = 10;
      stepSize = 10;
      pointsForMode = 5;
      break;
  }

  modeObject = {
    "stepSize": stepSize,
    "totalProblems": totalProblems,
    "pointsForMode": pointsForMode,
    "currentProblem": 0,
    "key": document.querySelector(".keys:checked").id
  };
}

/**
 * sets up new noteObject, calls all helper functions for gameflow
 */
function nextNote(clickedID) {
  progressBar();
  statistic(clickedID);
  if (modeObject.currentProblem+1 < modeObject.totalProblems) {
    initNotes(modeObject.key, true);
    changeAnswerBtns();
    modeObject.currentProblem++;
  } else {
    document.querySelector("#progress").value = 0;
    modeObject.currentProblem = 0;
    document.querySelector("#finModal").style.display = "block";
  }
}
