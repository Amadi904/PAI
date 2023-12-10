document.addEventListener('DOMContentLoaded', () => {
  const gridElement = document.getElementById('grid');
  const bonusContainer = document.createElement('div');
  bonusContainer.classList.add('bonus-container');
  document.body.appendChild(bonusContainer);

  let heroSquare = null;
  let heroHealth = 50;
  let heroAttack = 10;
  let bonusValue = 0;
  let bonusCounter = 0;
  let bonusTimeout;

  const squares = [];

  for (let i = 0; i < 3; i++) {
      squares[i] = [];
      for (let j = 0; j < 3; j++) {
          const square = document.createElement('div');
          square.classList.add('square');

          let value, textColor;

          if (i === 1 && j === 1) {
              value = `Health: ${heroHealth}\nAttack: ${heroAttack}`;
              textColor = '#e74c3c';
              heroSquare = square;
              heroSquare.classList.add('hero');
          } else {
              const healthValue = getRandomInt(0, 5);
              const attackValue = getRandomInt(0, 5);
              value = `Health: ${healthValue}\nAttack: ${attackValue}`;
              textColor = '#333';

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

  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getIndex(square) {
      for (let i = 0; i < squares.length; i++) {
          const j = squares[i].indexOf(square);
          if (j !== -1) {
              return { row: i, col: j };
          }
      }
  }

  function moveIndex(index, rowOffset, colOffset) {
      return { row: index.row + rowOffset, col: index.col + colOffset };
  }

  function moveHero(targetSquare, healthValue, attackValue) {
      const targetHealth = parseInt(targetSquare.textContent.split('\n')[0].split(' ')[1]);
      const targetAttack = parseInt(targetSquare.textContent.split('\n')[1].split(' ')[1]);

      heroHealth -= targetAttack;

      targetSquare.textContent = `Health: ${targetHealth - heroAttack}\nAttack: ${attackValue}`;

      const heroSquareHealth = getRandomInt(0, 5);
      const heroSquareAttack = getRandomInt(0, 5);
      heroSquare.textContent = `Health: ${heroSquareHealth}\nAttack: ${heroAttack}`;

      heroSquare.classList.remove('hero');
      heroSquare = targetSquare;
      heroSquare.textContent = `Health: ${heroHealth}\nAttack: ${heroAttack}`;
      heroSquare.classList.add('hero');

      bonusCounter++;
      if (bonusCounter === 3) {
          addBonus();
          bonusCounter = 0;
      }
  }

  function addBonus() {
      const bonusRow = getRandomInt(0, 2);
      const bonusCol = getRandomInt(0, 2);
      const bonusSquare = squares[bonusRow][bonusCol];

      bonusValue = getRandomInt(1, 10);

      bonusContainer.textContent = `Bonus: ${bonusValue}`;
      bonusContainer.classList.add('bonus');

      // Ustawienie timeout na 3 sekundy
      bonusTimeout = setTimeout(() => {
          hideBonus();
      }, 3000);
  }

  function hideBonus() {
      bonusContainer.textContent = '';
      bonusContainer.classList.remove('bonus');
      clearTimeout(bonusTimeout);
  }

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
              case ' ':
                  // Obsługa spacji - dodaj wartość pola bonus do ataku bohatera
                  if (bonusContainer.classList.contains('bonus')) {
                      heroAttack += bonusValue;
                      hideBonus();
                      bonusCounter = 0;
                      updateHeroStats();
                  }
                  return;
              default:
                  return;
          }

          const targetSquare = squares[newIndex.row] && squares[newIndex.row][newIndex.col];

          if (targetSquare) {
              moveHero(targetSquare);
          }
      }
  });

  function updateHeroStats() {
      heroSquare.textContent = `Health: ${heroHealth}\nAttack: ${heroAttack}`;
  }

  // Dodaj bonus na początku gry
  addBonus();
});
