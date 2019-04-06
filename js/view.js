VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var div = document.querySelector("#content");
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(500, 500);
var context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

// Create a stave of width 400 at position 10, 40 on the canvas.
var stave = new VF.Stave(10, 40, 400);

// Add a clef and time signature.
stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context and draw!
stave.setContext(context).draw();

var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
voice.addTickables(document.querySelector('#genTask').addEventListener("click", generateNotes(1), false););