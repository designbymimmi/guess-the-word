// List where guessed letters appear
const guessedLettersElement = document.querySelector(".guessed-letters");
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
// Placeholder for guessed letters
const guessedLetters = [];

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
  // Empty message paragraph
  message.innerText = "";
  // Grab what was entered
  let inputValue = guess.value;
  // Validate input
  const validatedGuess = validateInput(inputValue);
  console.log(validatedGuess);
  // Pass validated guess to guessed array
  if (validatedGuess) {
    makeGuess(validatedGuess);
  }
  // Empty guess input box
  guess.value = "";
});

// Function to validate player's input
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    // If input empty
    message.innerText = "You must enter a letter";
  } else if (input.length > 1) {
    // Input more than 1 letter
    message.innerText = "Only one letter is accepted";
  } else if (!input.match(acceptedLetter)) {
    // Not a alphabetic letter
    message.innerText = "Input needs to be a letter";
  } else {
    // Approved input
    return input;
  }
};

// Make guess Function
const makeGuess = function (letter) {
  let letterUpper = letter.toUpperCase();
  // Check if letter has already been guessed
  if (guessedLetters.includes(letterUpper)){
    message.innerText = "You've already guessed that. Try again!";
  } else {
    guessedLetters.push(letterUpper);
    console.log(guessedLetters);
  }
};
