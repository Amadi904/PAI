const gridElement = document.getElementById('grid');
let heroSquare = null;
let heroHealth = 50;
let heroAttack = 10;

// Utwórz tablicę 2D do śledzenia indeksów kwadratów
const squares = [];
for (let i = 0; i < 3; i++) {
  squares[i] = [];
  for (let j = 0; j < 3; j++) {
    const square = document.createElement('div');
    square.classList.add('square');

    let value, textColor;

    if (i === 1 && j === 1) {
      value = `Health: ${heroHealth}\nAttack: ${heroAttack}`;
      textColor = '#e74c3c'; // Kolor czerwony dla bohatera
      heroSquare = square;
      heroSquare.classList.add('hero');
    } else {
      const healthValue = getRandomInt(0, 5);
      const attackValue = getRandomInt(0, 5);
      value = `Health: ${healthValue}\nAttack: ${attackValue}`;
      textColor = '#333'; // Kolor standardowy dla innych kwadratów

      square.addEventListener('click', () => {
        moveHero(square, healthValue, attackValue);
      });
    }

    square.textContent = value;
    square.style.color = textColor;

    gridElement.appendChild(square);
    squares[i][j] = square;
  }
}

// Funkcja do uzyskania losowej liczby całkowitej z zakresu
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

// Funkcja do przesuwania bohatera
function moveHero(targetSquare, healthValue, attackValue) {
  const targetHealth = parseInt(targetSquare.textContent.split('\n')[0].split(' ')[1]);
  const targetAttack = parseInt(targetSquare.textContent.split('\n')[1].split(' ')[1]);

  // Odejmij wartość ataku od zdrowia bohatera
  heroHealth -= targetAttack;

  // Przypisz nowe wartości zdrowia i ataku na polu docelowym
  targetSquare.textContent = `Health: ${targetHealth - heroAttack}\nAttack: ${attackValue}`;

  // Przypisz nowe wartości zdrowia i ataku na polu, na którym aktualnie znajduje się bohater
  const heroSquareHealth = getRandomInt(0, 5);
  const heroSquareAttack = getRandomInt(0, 5);
  heroSquare.textContent = `Health: ${heroSquareHealth}\nAttack: ${heroSquareAttack}`;

  // Przypisz nowy kwadrat bohatera
  heroSquare.classList.remove('hero'); // Usuń klasę "hero" z poprzedniego kwadratu
  heroSquare = targetSquare;
  heroSquare.textContent = `Health: ${heroHealth}\nAttack: ${heroAttack}`;
  heroSquare.classList.add('hero'); // Dodaj klasę "hero" do nowego kwadratu
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
