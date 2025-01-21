let guesses = [];
let currentGuess = "";
let answer = "";
let hint = "";
const maxGuesses = 4;

const correctGuess = document.getElementById("correct-guess");
const table = document.getElementById("table");
const hintElement = document.getElementById('hint');
const restartGameButton = document.getElementById('restart-game');
const infoButton = document.getElementById('info-button');
const infoPopup = document.getElementById('info-popup');
const closeInfoButton = document.getElementById('close-info');

restartGameButton.disabled = true;
restartGameButton.textContent = 'Loading...';

const fetchDictionary = async () => {
  try {
    const response = await fetch('http://localhost:3338/wordle');
    const dictionary = await response.json();

    const randomIndex = Math.floor(Math.random() * dictionary.length);
    answer = dictionary[randomIndex].word;
    hint = dictionary[randomIndex].hint;
    hintElement.textContent = hint;

    restartGameButton.disabled = false;
    restartGameButton.textContent = 'Start Over';
  } catch (error) {
    console.error('Error fetching dictionary:', error);
  }
};

infoButton.addEventListener('click', () => {
  const infoText = "<ul>" +
    "<li>Start typing, the letters will appear in the box.</li>" +
    "<li>Remove letters with backspace.</li>" +
    "<li>Hit enter/return & answer will sumbit.</li>" +
    "<li>Click the ? to get a hint for the word!</li>" +
    "<li>Green = Letters in right spot.</li>" +
    "<li>Yellow = Letter in word but wrong spot.</li>" +
    "<li>Grey = Letter not in word.</li>" +
    "</ul>";
  document.getElementById('info-text').innerHTML = infoText;
  infoPopup.classList.remove('hidden');
});


closeInfoButton.addEventListener('click', () => {
infoPopup.classList.add('hidden');
});

window.addEventListener("keyup", (event) => {
  const key = event.key;

  if (key === "Enter") {
    if (currentGuess.length !== 4) {
      window.alert("first complete the word");
      return;
    }

    if (guesses.length < maxGuesses) {
      guesses.push(currentGuess);
      currentGuess = "";
      populateTable();

      if (guesses[guesses.length - 1].toLowerCase() === answer.toLowerCase()) {
        gameWon();
      } else if (guesses.length === maxGuesses) {
        gameOver();
      }
    }
  } else if (key === "Backspace" && currentGuess.length > 0) {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
  } else if (currentGuess.length < 4 && key.length === 1 && /^[a-zA-Z]$/.test(key)) {
    currentGuess = currentGuess.concat(key);
  }

  updateCurrentRow();
});

const populateTable = () => {
  clearTable();

  guesses.forEach((guess, index) => {
    guess.split('').forEach((char, charIndex) => {
      const cell = table.rows[index].cells[charIndex];
      cell.textContent = char;

      if (char.toLowerCase() === answer[charIndex].toLowerCase()) {
        cell.style.backgroundColor = 'green';
      } else if (answer.includes(char.toLowerCase())) {
        cell.style.backgroundColor = 'yellow';
      } else {
        cell.style.backgroundColor = 'gray';
      }
    });
  });
};

function toggleTheme() {
  const body = document.body;
  const themeToggleButton = document.getElementById("themeToggle");

  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    themeToggleButton.innerHTML = "&#9681;";
  } else {
    themeToggleButton.innerHTML = "&#9681;";
  }
}


const updateCurrentRow = () => {
  const currentRowIndex = guesses.length;
  currentGuess.split('').forEach((char, index) => {
    const cell = table.rows[currentRowIndex].cells[index];
    if (cell) {
      cell.textContent = char;
    }
  });

  for (let i = currentGuess.length; i < 4; i++) {
    const cell = table.rows[currentRowIndex].cells[i];
    if (cell) {
      cell.textContent = "";
    }
  }
};

const restartGame = () => {
  guesses = [];
  currentGuess = "";
  fetchDictionary(); 
  clearTable();
  correctGuess.classList.add("hidden");
  table.classList.remove("correct");
};

const clearTable = () => {
  for (let i = 0; i < maxGuesses; i++) {
    for (let j = 0; j < 4; j++) {
      const cell = table.rows[i].cells[j];
      cell.textContent = "";
      cell.style.backgroundColor = '';
    }
  }
};

const gameWon = () => {
  const congratsModal = document.getElementById('congratsModal');
  congratsModal.style.display = 'block';

  const closeModal = document.getElementById('closeModal');
  closeModal.onclick = function() {
    congratsModal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == congratsModal) {
      congratsModal.style.display = 'none';
    }
  }

  restartGame();
};

const gameOver = () => {
  correctGuess.textContent = "Couldn't guess the word. You lost!";
  correctGuess.classList.remove("hidden");
  correctGuess.style.backgroundColor = 'red';
};

const hintButton = document.getElementById('hint-button');
const hintPopup = document.getElementById('hint-popup');
const closeHintButton = document.getElementById('close-hint');

hintButton.addEventListener('click', () => {
  if (hint !== "") {
    document.getElementById('hint').textContent = hint;
    hintPopup.classList.remove('hidden');
  } else {
    document.getElementById('hint').textContent = "No hint available.";
    hintPopup.classList.remove('hidden');
  }
});

closeHintButton.addEventListener('click', () => {
  hintPopup.classList.add('hidden');
});

restartGameButton.addEventListener('click', restartGame);
restartGameButton.addEventListener('click', fetchDictionary);


fetchDictionary();