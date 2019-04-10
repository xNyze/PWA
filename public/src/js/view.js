document.querySelector("#play").addEventListener("click", function() {
    initNotes(document.querySelector('.keys:checked').id,true);
    changeAnswerBtns();    
}, false);

function changeAnswerBtns () {
    var answers = noteObject.answers;
    answers = shuffle(answers);
    var answerBtns = document.querySelectorAll('[id*=Button]');
    var i = 0;
    answerBtns.forEach(function(button) {
        button.textContent = answers[i];
        console.warn(button.textContent);
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