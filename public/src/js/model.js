var noteObject;
var statsObject = {
  totalPoints: 0,
  rounds: []
};
var modeObject;
var randomize = true;
var ajaxResult;
var ajaxIndex = 0;

/**
 * fetches data asynchronously from the hardcoded specified server
 */
function ajaxCall() {
  var opts = {
    method: 'GET',
    headers: {}
  };
  // IT-Beleg-Server with MongoDB https://floating-chamber-45103.herokuapp.com/api 
  // HTW-Server http://idefix.informatik.htw-dresden.de/it1/beleg/noten-aufgaben.js
  fetch('https://floating-chamber-45103.herokuapp.com/api', opts).then(function (response) {
    return response.json();
  })
    .then(function (responseBody) {
      ajaxResult = responseBody;
    });
}

/**
 * initializes every new note + answers for the game
 * or parses the ajax-data for new round
 * @param {String} enteredKey
 * @param {boolean} randomize
 */
function initNotes(enteredKey, randomize) {
  var key = enteredKey || "treble";
  if (randomize) {
    noteObject = genNote();
  } else {
    var parsedResponse;
    if (ajaxResult.note) {
      parsedResponse = {
        note: [ajaxResult.note[ajaxIndex].a.substring(0, 1) + "/" + ajaxResult.note[ajaxIndex].a.substring(1, 2)],
        answers: ajaxResult.note[ajaxIndex].l
      };
      ajaxIndex = ajaxIndex < ajaxResult.note.length ? ajaxIndex + 1 : 0;
    } else {
      parsedResponse = {
        note: [ajaxResult[0].note.a.substring(0, 1) + "/" + ajaxResult[0].note.a.substring(1, 2)],
        answers: ajaxResult[0].note.l
      };
    }
    noteObject = parsedResponse;
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
