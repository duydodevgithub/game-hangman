// define words bank
var words = ["tiger", "lion", "elephant", "turtle", "monkey"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];
// Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length;
	// Reset
	guessesLeft = 9;
	wrongLetters = [];
    blanksAndSuccesses = [];
    
    // Populate blanks and successes with right number of blanks.
	for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    $("#words").text(blanksAndSuccesses.join(" "));
}

function checkLetters(letter) {
	// check if letter exists in code at all
	var isLetterInWord = false;
	for (var i = 0; i < numBlanks; i++) {
		if (selectedWord[i] == letter) {
			isLetterInWord = true;
		}
	}
	if (isLetterInWord) {
		for (var i = 0; i < numBlanks; i++) {
			if (selectedWord[i] == letter) {
				blanksAndSuccesses[i] = letter;
			}
		}
	}
	// Letter not found
	else {
		wrongLetters.push(letter);
		guessesLeft--
	}
}
function roundComplete() {
	// console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left " + guessesLeft);
	// last step update HTML to reflect the most recent guesses
    $("#words").text(blanksAndSuccesses.join(" "));
    $("#numGuesses").text(guessesLeft);
    $("#wrongGuesses").text(wrongLetters.join(" "));
	// Check if user won
	if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
		winCount++;
		alert("You Won");
		// Update the win counter in HTML
		$("#winCounter").text(winCount);
		startGame();
	}
	// Check if user lost
	else if (guessesLeft == 0) {
		lossCount++;
		alert("You Lost!");
		// Update HTML
		$("#lossCounter").text(lossCount);
		startGame();
	}
}
// MAIN PROCESS
// -----------------------------------------
startGame();
// Register keyclicks
document.onkeyup = function (event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();
	// Testing / Debugging
	// console.log(letterGuessed);
}