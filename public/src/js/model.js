var noteObject;
var statsObject = {
  totalPoints: 0,
  problems: []
};
/**
 * initializes every new note + answers for the game
 * @param {key chosen by the user from the radioButton} enteredKey 
 * @param {boolean, if true another note + answers is generated} rand 
 */
function initNotes(enteredKey, rand) {
  var key = enteredKey || 'treble';

  if(rand) {
    noteObject = genNote();
  }
  renderNotes(noteObject.note, key);
}

/**
 * returns noteObject object containing the note for rendering and the answers for displaying
 * answers[0] is always the solution, needs to be shuffled in the view
 */
function genNote() {
  var everyNote = ['C','D','E','F','G'];
  var everyNoteIndex = [];
  for(var i=0; i<everyNote.length; i++) {
    everyNoteIndex.push(i);
  } 
  var randomIndex = distinctRandom(everyNoteIndex);
  var randomAnswers = [];
  while(randomAnswers.length < 4) {
    randomAnswers.push(everyNote[randomIndex.next().value]);  
  }
  var noteObject = {
    note: [randomAnswers[0]+"/4"],
    answers: randomAnswers
  };
  return noteObject;
}

/**
 * shuffles a given array of numbers and returns a distinct random number of that array
 * @param {array of numbers yielding distinct members, when prompted, until empty} numbers 
 */
function *distinctRandom(numbers) {
  var rand = numbers.length;
  while (rand--) {
      yield numbers.splice(Math.floor(Math.random() * (rand+1)), 1)[0];
  }
}

/**
 * Vexflow Library rendering a single note for the game scenario
 * @param {generated note, which will be rendered} note 
 * @param {chosen key to render the note in} key 
 */
function renderNotes(note, key) {
  document.getElementById('note').innerHTML = "";
    var div = document.getElementById("note");

    VF = Vex.Flow;
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(120, 150);
    var context = renderer.getContext();
    var stave = new VF.Stave(10, 10, 100);
    stave.addClef(key);
    stave.setContext(context).draw();
 
    var notes = [
    new VF.StaveNote({clef: key, keys: note, duration: "q"}),
    ];

    var voice = new VF.Voice({num_beats:1,  beat_value: 4});
    voice.addTickables(notes);
    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 50);
    voice.draw(context, stave);
}