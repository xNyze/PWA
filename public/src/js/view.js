/**
 * eventlistener for the navGame button
 */
document.querySelector("#navGame").addEventListener("click", function() {
  document.querySelector("#modeModal").style.display = "block";
});

/**
 * eventlistener for the play buttons
 * initializes the first noteObject, changes the answerBtns and renders the game content
 */
document
  .querySelectorAll(".play")
  .forEach(playBtn => playBtn.addEventListener("click", renderGame));

/**
 * eventlistener for the 'show statistic' buttons
 */
document
  .querySelectorAll("#showStatistic, #navStats")
  .forEach(stats => stats.addEventListener("click", renderStats));

/**
 * eventlistener for the navContact button
 */
document.querySelector("#navContact").addEventListener("click", function() {
  document.querySelector("#stats").style.display = "none";
  document.querySelector("#game").style.display = "none";
  document.querySelector("#contact").style.display = "block";
});

/**
 * changes the textContent of the answerButtons to the according answer possibilities after
 * shuffling the array ob the global noteObject
 */
function changeAnswerBtns() {
  var answers = noteObject.answers;
  answers = shuffle(answers);
  var answerBtns = document.querySelectorAll("[id*=Button]");
  var i = 0;
  answerBtns.forEach(function(button) {
    button.textContent = answers[i];
    i++;
  });
}

/**
 * modern Fisher-Yates-Shuffle, returns a shuffled array
 * @param {Array} array
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * renders the stat div, hides all other in mainContent
 */
function renderStats() {
  document.querySelectorAll(".modal").forEach(function(modal) {
    modal.style.display = "none";
  });
  document.querySelector("#stats #totalPoints").textContent =
    statsObject.totalPoints;
  document.querySelector("#stats #totalPoints").textContent = JSON.stringify(
    statsObject
  );
  document.querySelector("#contact").style.display = "none";
  document.querySelector("#game").style.display = "none";
  document.querySelector("#stats").style.display = "block";
}

/**
 * initiates modeModal, renders the game-div, hides all other in mainContent
 */
function renderGame() {
  initNotes(document.querySelector(".keys:checked").id, true);
  changeAnswerBtns();
  document.querySelectorAll(".modal").forEach(function(modal) {
    modal.style.display = "none";
  });
  document.querySelector("#contact").style.display = "none";
  document.querySelector("#stats").style.display = "none";
  document.querySelector("#game").style.display = "block";
}
