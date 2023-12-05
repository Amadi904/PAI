const gridElement = document.getElementById('grid');
let activeSquare = null;

// Utwórz tablicę 2D do śledzenia indeksów kwadratów
const squares = [];
for (let i = 0; i < 5; i++) {
  squares[i] = [];
  for (let j = 0; j < 5; j++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.textContent = i * 5 + j + 1;

    square.addEventListener('click', () => {
      setActiveSquare(square);
    });

    gridElement.appendChild(square);
    squares[i][j] = square;
  }
}

// Funkcja ustawiająca aktywny kwadrat
function setActiveSquare(square) {
  if (activeSquare) {
    activeSquare.classList.remove('active');
  }

  activeSquare = square;
  activeSquare.classList.add('active');
}

// Obsługa strzałek
document.addEventListener('keydown', (event) => {
  if (activeSquare) {
    const currentIndex = getIndex(activeSquare);

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

    if (isValidIndex(newIndex)) {
      setActiveSquare(squares[newIndex.row][newIndex.col]);
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

// Funkcja sprawdzająca, czy nowy indeks jest poprawny
function isValidIndex(index) {
  return index.row >= 0 && index.row < 5 && index.col >= 0 && index.col < 5;
}
