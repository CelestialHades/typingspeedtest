// 1. Get DOM elements
const textToType = document.getElementById('textToType');
const typingArea = document.getElementById('typingArea');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const resultsDisplay = document.getElementById('results');

// 2. Initialize state and sample texts
const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "She sells seashells by the seashore.",
  "How much wood would a woodchuck chuck if a woodchuck could chuck wood?"
];
let currentText = sampleTexts[0];
let timeLeft = 60;
let timerId = null;
let isRunning = false;

// 3. Function to get a random text
function getRandomText() {
  const randomIndex = Math.floor(Math.random() * sampleTexts.length);
  currentText = sampleTexts[randomIndex];
  textToType.textContent = currentText;
}

// 4. Function to update timer display
function updateTimer() {
  timerDisplay.textContent = `Time: ${timeLeft}s`;
}

// 5. Function to calculate results
function calculateResults() {
  const typedText = typingArea.value.trim();
  const wordsTyped = typedText.split(/\s+/).length;
  const wpm = Math.round((wordsTyped / (60 - timeLeft)) * 60); // Words per minute
  
  const originalWords = currentText.split(' ');
  const typedWords = typedText.split(' ');
  let correctWords = 0;
  
  for (let i = 0; i < Math.min(originalWords.length, typedWords.length); i++) {
    if (originalWords[i] === typedWords[i]) correctWords++;
  }
  
  const accuracy = Math.round((correctWords / originalWords.length) * 100);
  
  resultsDisplay.textContent = `WPM: ${wpm} | Accuracy: ${accuracy}%`;
}

// 6. Function to start the test
function startTest() {
  if (!isRunning) {
    isRunning = true;
    typingArea.value = '';
    resultsDisplay.textContent = '';
    typingArea.focus();
    
    timerId = setInterval(() => {
      timeLeft--;
      updateTimer();
      
      if (timeLeft <= 0) {
        clearInterval(timerId);
        isRunning = false;
        calculateResults();
        typingArea.disabled = true;
      }
    }, 1000);
  }
}

// 7. Function to reset the test
function resetTest() {
  clearInterval(timerId);
  isRunning = false;
  timeLeft = 60;
  updateTimer();
  typingArea.value = '';
  typingArea.disabled = false;
  resultsDisplay.textContent = '';
  getRandomText(); // New random text on reset
}

// 8. Initial setup
getRandomText(); // Start with a random text
updateTimer();