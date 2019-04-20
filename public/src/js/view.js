/**
 * eventlistener for the navGame button
 */
document.querySelector("#navGame").addEventListener("click", function () {
  if (document.querySelector('#game').style.display != "block") {
    document.querySelector("#modeModal").style.display = "block";
  }
});

/**
 * eventlistener for the play buttons
 * initializes the first noteObject and the modeObject, changes the answerBtns and renders the game content
 */
document.querySelectorAll(".play, .playBtn, #playAgain").forEach(playBtn =>
  playBtn.addEventListener("click", function () {
    setMode();
    renderGame();
  })
);

/**
 * eventlistener for the 'show statistic' buttons
 */
document.querySelectorAll("#showStatistic, #navStats").forEach(stats => stats.addEventListener("click", function () {
  if (!!statsObject.rounds.length) {
    renderStats();
  } else {
    window.alert('Keine Statistik vorhanden.');
  }
}));

/**
 * eventlistener for the navContact button
 */
document.querySelector("#navContact").addEventListener("click", function () {
  document.querySelector("#stats").style.display = "none";
  document.querySelector("#game").style.display = "none";
  document.querySelector("#contact").style.display = "block";
});

/**
 * changes the textContent of the answerButtons to the according answer possibilities after
 * shuffling the array ob the global noteObject
 */
function changeAnswerBtns() {
  var answers = noteObject.answers.slice();
  shuffle(answers);
  var answerBtns = document.querySelectorAll("[id*=Button]");
  var i = 0;
  answerBtns.forEach(function (button) {
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
}

/**
 * renders the stat div, hides all other in mainContent
 */
function renderStats() {
  document.querySelectorAll(".modal").forEach(function (modal) {
    modal.style.display = "none";
  });
  document.querySelector("#contact").style.display = "none";
  document.querySelector("#game").style.display = "none";

  if (!statsObject.hasOwnProperty("indexRounds")) {
    Object.assign(statsObject, { indexRounds: statsObject.rounds.length - 1 });
  } else {
    statsObject.indexRounds = statsObject.rounds.length - 1;
  }

  var currentStatObject = statsObject.rounds[statsObject.indexRounds];
  statsObject.indexQuestions = 0;

  document.querySelector("#userAnswer").textContent = currentStatObject[statsObject.indexQuestions].answer;
  document.querySelector("#correctAnswer").textContent = currentStatObject[statsObject.indexQuestions].noteObject.note.slice(0, 1);
  renderNotes(currentStatObject[statsObject.indexQuestions].noteObject.note, modeObject.key, document.querySelector("#statNote"));

  document.querySelector("#questionBack").style.display = "none";
  document.querySelector("#roundBack").style.display = statsObject.rounds.length > 1 ? "" : "none";
  document.querySelector("#roundForward").style.display = "none";
  document.querySelector("#stats").style.display = "block";
}

/**
 * initiates modeModal, renders the game-div, hides all other in mainContent
 */
function renderGame() {
  initNotes(document.querySelector(".keys:checked").id, true);
  changeAnswerBtns();
  document.querySelectorAll(".modal").forEach(function (modal) {
    modal.style.display = "none";
  });
  document.querySelector("#contact").style.display = "none";
  document.querySelector("#stats").style.display = "none";
  document.querySelector("#game").style.display = "block";
}

/**
 * Vexflow Library rendering a single note for the game scenario
 * @param {array} note
 * @param {String} key
 * @param {DOM element} node
 */
function renderNotes(note, key, node) {
  node.innerHTML = "";
  var div = node;

  VF = Vex.Flow;
  var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  renderer.resize(120, 150);
  var context = renderer.getContext();
  context.setViewBox(20, 20, 85, 85);
  var stave = new VF.Stave(20, 20, 100);
  stave.addClef(key);
  stave.setContext(context).draw();

  var notes = [new VF.StaveNote({ clef: key, keys: note, duration: "q" })];

  var voice = new VF.Voice({ num_beats: 1, beat_value: 4 });
  voice.addTickables(notes);
  var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 50);
  voice.draw(context, stave);
}
