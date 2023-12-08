const gridElement = document.getElementById('grid');
let heroSquare = null;
let heroValue = 100;

// Utwórz tablicę 2D do śledzenia indeksów kwadratów
const squares = [];
for (let i = 0; i < 3; i++) {
  squares[i] = [];
  for (let j = 0; j < 3; j++) {
    const square = document.createElement('div');
    square.classList.add('square');

    const value = i === 1 && j === 1 ? heroValue : getRandomInt(-10, 11);
    square.textContent = value;

    square.addEventListener('click', () => {
      moveHero(square);
    });

    gridElement.appendChild(square);
    squares[i][j] = square;

    if (value === heroValue) {
      heroSquare = square;
      heroSquare.classList.add('hero');
    }
  }
}

// Funkcja do uzyskania losowej liczby całkowitej z zakresu
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funkcja do przesuwania bohatera
function moveHero(targetSquare) {
  const targetValue = parseInt(targetSquare.textContent);

  // Zaktualizuj wartość bohatera
  heroValue += targetValue;

  // Zaktualizuj kwadrat bohatera
  heroSquare.classList.remove('hero');
  heroSquare.textContent = heroValue;

  // Zaktualizuj wartość pola docelowego
  targetSquare.textContent = heroValue;

  // Zaktualizuj wartość pola, na którym wcześniej stał bohater
  const previousSquare = heroSquare;
  const previousValue = getRandomInt(-10, 11);
  previousSquare.textContent = previousValue;

  // Przypisz nowy kwadrat bohatera
  heroSquare = targetSquare;
  heroSquare.classList.add('hero');
}

// Obsługa strzałek
document.addEventListener('keydown', (event) => {
  if (heroSquare) {
    const currentIndex = getIndex(heroSquare);

    let newIndex;
    switch (event.key) {
      case 'ArrowUp':
        newIndex = moveIndex(currentIndex, -1, 0);
        break;
      case 'ArrowDown':
        newIndex = moveIndex(currentIndex, 1, 0);
        break;
      case 'ArrowLeft':
        newIndex = moveIndex(currentIndex, 0, -1);
        break;
      case 'ArrowRight':
        newIndex = moveIndex(currentIndex, 0, 1);
        break;
      default:
        return;
    }

    const targetSquare = squares[newIndex.row] && squares[newIndex.row][newIndex.col];

    if (targetSquare) {
      moveHero(targetSquare);
    }
  }
});

// Funkcja do uzyskania indeksu kwadratu w tablicy
function getIndex(square) {
  for (let i = 0; i < squares.length; i++) {
    const j = squares[i].indexOf(square);
    if (j !== -1) {
      return { row: i, col: j };
    }
  }
}

// Funkcja do przesuwania indeksu
function moveIndex(index, rowOffset, colOffset) {
  return { row: index.row + rowOffset, col: index.col + colOffset };
}
