var noteObject;
var statsObject = {
  totalPoints: 0,
  rounds: []
};
var modeObject;
/**
 * initializes every new note + answers for the game
 * @param {String} enteredKey
 * @param {boolean} rand
 */
function initNotes(enteredKey, rand) {
  var key = enteredKey || "treble";

  if (rand) {
    noteObject = genNote();
  }
  renderNotes(noteObject.note, key, document.getElementById("note"));
}

/**
 * returns noteObject object containing the note for rendering and the answers for displaying
 * answers[0] is always the solution, needs to be shuffled in the view
 */
function genNote() {
  var everyNote = ["C", "D", "E", "F", "G"];
  var everyNoteIndex = [];
  for (var i = 0; i < everyNote.length; i++) {
    everyNoteIndex.push(i);
  }
  var randomIndex = distinctRandom(everyNoteIndex);
  var randomAnswers = [];
  while (randomAnswers.length < 4) {
    randomAnswers.push(everyNote[randomIndex.next().value]);
  }
  var noteObject = {
    note: [randomAnswers[0] + "/4"],
    answers: randomAnswers
  };
  return noteObject;
}

/**
 * yielding(returning) distinct members of array, if prompted, until empty
 * @param {array} numbers
 */
function* distinctRandom(numbers) {
  var rand = numbers.length;
  while (rand--) {
    yield numbers.splice(Math.floor(Math.random() * (rand + 1)), 1)[0];
  }
}
