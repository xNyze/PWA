var noteObject;
var statsObject = {
  totalPoints: 0,
  rounds: []
};
var modeObject;
var randomize = true;
/**
 * initializes every new note + answers for the game
 * @param {String} enteredKey
 * @param {boolean} randomize
 */
function initNotes(enteredKey, randomize) {
  var key = enteredKey || "treble";

  if (randomize) {
    noteObject = genNote();
  } else { // fetch task from remote server and parse to fit the noteObject format
    var opts = {
      method: 'GET',
      headers: {}
    };
    fetch('/get-data', opts).then(function (response) {
      return response.json();
    })
      .then(function (responseBody) {
        var parsedResponse = {
          note: [responseBody.note[0].a.substring(0, 1) + "/" + responseBody.note[0].a.substring(1, 2)],
          answers: responseBody.note[0].l
        };

        noteObject = parsedResponse;
        console.warn(noteObject.note);
      });
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
