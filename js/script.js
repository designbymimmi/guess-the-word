// List where guessed letters appear
const guessedLettersElement = document.querySelector(".guessed-letters");
// Guess button
const guessButton = document.querySelector(".guess");
// Input box for guessing letters
const guess = document.querySelector(".letter");
// Paragraph for the word in progress
const wordInProgress = document.querySelector(".word-in-progress");
// Remaining guesses display
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
let remainingGuesses = 8; // tracking number of guesses
// Message when player guess a letters
const message = document.querySelector(".message");
// Hidden button that prompt player to play again
const playAgainButton = document.querySelector(".play-again");
// Starting word to test out the game
let word = "magnolia";
// Placeholder for guessed letters
const guessedLetters = [];

// Grab random words from text file and update placeholder and word 
const getWord = async function () {
  const requestData = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const data = await requestData.text();
  // Turn all words into an array
  const wordArray = data.split("\n");
  // Select random word
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  const randomWord = wordArray[randomIndex].trim();

  console.log(randomWord);
  word = randomWord;
  placeholder(word);
;};

// Function to update the word in progress text
const placeholder = function (word) {
  let symbolsToAdd = [];
  for (let letter of word) {
    symbolsToAdd.push("●");
  }
  wordInProgress.innerText = symbolsToAdd.join("");
};

getWord();

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
    message.innerText = "Needs to be a letter";
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
    showGuessedLetters();
    countGuesses(letterUpper);
    updateWordInProgress(guessedLetters);
  }
};

// Update placeholder with correct guessed letter
const showGuessedLetters = function () {
  guessedLettersElement.innerHTML = "";
  // Add and display guessed letters in the guessed letters element
  for (let letter of guessedLetters) {
    const listElement = document.createElement("li");
    listElement.innerText = letter;
    guessedLettersElement.append(listElement);
  }
};

// Replace circle symbols with correct letter guessed
const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  // Check if wordArray contains any letters from guessed letters
  let revealWord = [];
  for (let letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter);
    } else {
      revealWord.push("●");
    }
  }
  wordInProgress.innerText = revealWord.join("");
  ifWin();
};

// Track number of guesses
const countGuesses = function (guess) {
  const wordUpper = word.toUpperCase();

  if (wordUpper.includes(guess)) {
    message.innerText = `Good guess! The word has the letter ${guess}`;
  } else {
    message.innerText = `The word doesn't include ${guess}`;
    remainingGuesses -= 1;
  }

  if (remainingGuesses === 0) {
    remainingGuessesElement.innerHTML = `<p>Sorry, the game is over. The word was "${word}"</p>`;
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = "1 guess";
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

// Check if player won
const ifWin = function () {
  if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};
