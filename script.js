// Utwórz tablicę 2D do śledzenia indeksów kwadratów
const squares = [];
for (let i = 0; i < 3; i++) {
  squares[i] = [];
}

const gridElement = document.getElementById('grid');
let activeSquare = null;
let score = 0;

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const square = document.createElement('div');
    square.classList.add('square');
    const randomNumber = getRandomNumber(-10, 10);
    square.textContent = randomNumber;
    square.dataset.value = randomNumber;

    square.addEventListener('click', () => {
      handleSquareClick(square);
    });

    gridElement.appendChild(square);
    squares[i][j] = square;
  }
}

// Startowo zaznacz pole środkowe
setActiveSquare(squares[1][1]);

// Dodaj pole użytkowe "HERO"
const heroSquare = document.createElement('div');
heroSquare.classList.add('square', 'hero');
heroSquare.textContent = 'HERO';
gridElement.appendChild(heroSquare);

// Funkcja ustawiająca aktywny kwadrat
function setActiveSquare(square) {
  if (activeSquare) {
    activeSquare.classList.remove('active');
  }

  activeSquare = square;
  activeSquare.classList.add('active');
}

// Funkcja obsługująca kliknięcie na kwadrat
function handleSquareClick(square) {
  if (square === heroSquare) {
    // Nie dodawaj/odejmuj punktów za kliknięcie w pole "HERO"
    return;
  }

  const value = parseInt(square.dataset.value, 10);
  score += value;

  updateScore();
  setActiveSquare(square);
}

// Funkcja aktualizująca wynik na stronie
function updateScore() {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `Wynik: ${score}`;
}

// Funkcja generująca losową liczbę z zakresu
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
