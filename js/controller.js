/**
 * creating eventlisteners for elements intended for user interaction
 */
var buttons = document.querySelectorAll("[id*=Button]");
buttons.forEach(function(button) {
  button.addEventListener("click", nextNote);
});

var radioButtons = document.querySelectorAll("#violin, #bass");
radioButtons.forEach(function(radioButton) {
  radioButton.addEventListener("click", function(radioButton) {
    if (radioButton.checked) {
      console.warn("true");
      radioButton.checked = false;
    } else {
      radioButton.checked = true;
    }
  });
});

function progressBar() {
  document.querySelector("#progress").value =
    document.querySelector("#progress").value + 10;
}

function statistic() {}

function nextNote() {
  progressBar();
}
