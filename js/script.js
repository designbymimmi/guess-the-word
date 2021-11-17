// List where guessed letters appear
const guessedLetters = document.querySelector(".guessed-letters");
// Guess button
const guessButton = document.querySelector(".guess");
// Input box for guessing letters
const guess = document.querySelector(".letter");
// Paragraph for the word in progress
const wordInProgress = document.querySelector(".word-in-progress");
// Remaining guesses display
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
// Message when player guess a letters
const message = document.querySelector(".message");
// Hidden button that prompt player to play again
const playAgainButton = document.querySelector(".play-again");
// Starting word to test out the game
const word = "magnolia";

// Function to update the word in progress text
const updateWordInProgress = function (word) {
  let symbolsToAdd = [];
  for (let letter of word) {
    symbolsToAdd.push("●");
  }
  wordInProgress.innerText = symbolsToAdd.join("");
};

updateWordInProgress(word);

// Event listener for clicking the guess guessButton
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  let inputValue = guess.value;
  console.log(inputValue);
  guess.value = "";
});
