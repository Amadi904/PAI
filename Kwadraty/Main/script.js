const skill = localStorage.getItem('ostatniWybranyObrazek');
console.log(skill + ' to numer');

// Umiejki -----------------------------------------------------------------------------------------------------------------------------------
function decreaseNeighbourHP() {
  for (let i = 0; i <= 8; i++){
  const neighbourIndex = currentCellIndex - (i-4); // Komórka po lewej stronie (jeśli istnieje)
  const highlightedRow = Math.floor(currentCellIndex / 5);
  const currentRow = Math.floor((currentCellIndex - (i-4)) / 5);
  if (highlightedRow === currentRow) {
    const neighbourCellValues = cells[neighbourIndex].textContent.split('-');
    let neighbourHP = parseInt(neighbourCellValues[0]);

     if (neighbourHP <= 15){
        neighbourHP = 0;
     } else{ 
        neighbourHP -= 15;
     }
    cells[neighbourIndex].textContent = generateCellValue(neighbourHP, parseInt(neighbourCellValues[1]), parseInt(neighbourCellValues[2]));
  } else {
    console.log('FUCK U BITCH')
  }
}}



// Pobieramy Grid z style.css
const grid = document.getElementById('grid');
const cells = [];



// Funkcja generująca wartość dla komórki na podstawie wartości początkowych
function generateCellValue(hp, dmg, money) {
  return `${hp}-${dmg}-${money}`;
}



// Inicjalizacja wartości początkowych
let maxHP = 20;
let initialHP = 20;
let initialDMG = 10;
let initialMoney = 0;
let steps = 0;
let oblicz = 0;
let armor = 0;

if (skill == 1)        {
  maxHP = 8;
  initialHP = 8;
  initialDMG = 14;
} else if (skill == 2) {
  maxHP = 10;
  initialHP = 10;
  initialDMG = 12;
  armor = 1;
} else if (skill == 3) {
  maxHP = 12;
  initialHP = 12;
  initialDMG = 10;
  armor = 2;
}



// Tworzenie siatki komórek z wartościami początkowymi
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) { 
    const cell = document.createElement('div');
    cell.classList.add('cell');

    // Ustawienie wartości początkowych dla zaznaczonego pola (indeks 0,0)
    if (i === 2 && j === 2) {
      cell.textContent = generateCellValue(initialHP, initialDMG, initialMoney);
      cell.classList.add('highlighted');
    } else {
      cell.textContent = generateCellValue(
        Math.floor(0),
        Math.floor(0),
        Math.floor(Math.random() * 4 + 2)
      );
    }
    grid.appendChild(cell);
    cells.push(cell);
  }
}
let currentCellIndex = 12; // Inicjalizacja zmiennej przechowującej indeks bieżącej komórki na siatce



// Zmiana watości Życia i Ataku gdy mało komórka specjalna jest
function checkStats() {
  cells.forEach((cell, index) => {
    // Sprawdzenie, czy komórka nie ma klasy "highlighted"
    if (!cell.classList.contains('highlighted')) {
      const cellValues = cell.textContent.split('-');
      let cellHP = parseInt(cellValues[0]);
      let cellDMG = parseInt(cellValues[1]);
      let cellMoney = parseInt(cellValues[2]);


      // WAŻNE ----------------- WAŻNE - To pozwala manipulować wartościami HP-ATAK-MONEY istniejących komórek zależnie od czegokolwiek
      if (cellMoney == 3 && cellHP == 0 && cellDMG == 0) {
        cellDMG = 4;
        cellHP = 8;
      } else if (cellMoney == 4 && cellHP == 0 && cellDMG == 0) {
        cellDMG = 4;
        cellHP = 16;
      } else if (cellMoney == 5 && cellHP == 0 && cellDMG == 0) {
        cellDMG = 3;
        cellHP = 14;
      } else if (cellMoney == 6 && cellHP == 0 && cellDMG == 0) {
        cellDMG = 4;
        cellHP = 17;
      } else if (cellMoney == 7 && cellHP == 0 && cellDMG == 0) {
        cellDMG = 1;
        cellHP = 20;
      } else if (cellMoney == 8 && cellHP == 0 && cellDMG == 0) {
        cellDMG = 8;
        cellHP = 11;
      } else if (cellMoney == 9 && cellHP == 0 && cellDMG == 0) {
        cellDMG = 3;
        cellHP = 15;
      } else if (cellMoney == 10 && cellHP == 0 && cellDMG == 0) {
        cellDMG = 4;
        cellHP = 20;
      } else if (cellMoney == 11 && cellHP == 0 && cellDMG == 0) {
        cellDMG = 10;
        cellHP = 41;
      }
      cell.textContent = generateCellValue(cellHP, cellDMG, parseInt(cellValues[2]));




      // Tu unikalne efekty komórek
      if (cellMoney == 11 && cellHP >= 2){
        cellHP -=1;
        cell.textContent = generateCellValue(cellHP, cellDMG, parseInt(cellValues[2]));
      }
    }
  });
}
checkStats();



// Nasłuchiwanie na zdarzenie naciśnięcia klawisza
document.addEventListener('keydown', (event) => {

  
  // Pobranie wartości z komórki "highlighted" i zapisanie ich w zmiennych
  const highlightedValues = cells[currentCellIndex].textContent.split('-');
  let highlightedHP = parseInt(highlightedValues[0]);
  let highlightedDMG = parseInt(highlightedValues[1]);
  let highlightedMoney = parseInt(highlightedValues[2]);

  console.log('Wartości z komórki highlighted:', highlightedMoney);


    // To zmioenia poprzednio okupowaną komórke na losową
    if (highlightedMoney <= 100)        {
      cells[currentCellIndex].textContent = generateCellValue(
        Math.floor(0),
        Math.floor(0),
        Math.floor(Math.random() * 10 + 1)
      );
    } else if (highlightedMoney <= 200) {
      cells[currentCellIndex].textContent = generateCellValue(
        Math.floor(0),
        Math.floor(0),
        Math.floor(Math.random() * 15 + 1)
      );
    } else if (highlightedMoney <= 300) {
      cells[currentCellIndex].textContent = generateCellValue(
        Math.floor(0),
        Math.floor(0),
        Math.floor(Math.random() * 20 + 1)
      );
    } else if (highlightedMoney >= 301) {
      cells[currentCellIndex].textContent = generateCellValue(
        Math.floor(0),
        Math.floor(0),
        Math.floor(Math.random() * 20 + 6)
      );
    }
  
  


  cells[currentCellIndex].classList.remove('highlighted'); // Usunięcie klasy 'highlighted' z poprzedniej komórki
  

  

  // Warunki obsługujące ruch po siatce w zależności od naciśniętego klawisza
  if (
    (event.key === 'a' || event.key === 'ArrowLeft') && currentCellIndex % 5 !== 0) {
    currentCellIndex -= 1,
    steps += 1,
    oblicz += 1;
    checkStats();
  } else if ((event.key === 'w' || event.key === 'ArrowUp') && currentCellIndex >= 5) {
    currentCellIndex -= 5,
    steps += 1,
    oblicz += 1;
    checkStats();
  } else if ((event.key === 'd'  || event.key==='ArrowRight') && currentCellIndex % 5 !== 4) {
    currentCellIndex += 1,
    steps += 1,
    oblicz += 1;
    checkStats();
  } else if ((event.key === 's' || event.key==='ArrowDown')  && currentCellIndex < 20) {
    currentCellIndex += 5,
    steps += 1,
    oblicz += 1;
    checkStats();
  } // Umiejki dla postaci
    else if (event.key === 'r' && steps >= 1) {
      if (skill == 1)        {
        decreaseNeighbourHP();
      } else if (skill == 2) {

      } else if (skill == 3) {
        
      }
      steps = 0;
  }
  console.log('Liczba kroków: ' + steps)
  console.log('Oblicz? ' + oblicz)

  

// Operacja na wartościach wewnątrz komórek
let currentCellValues = cells[currentCellIndex].textContent.split('-');
let currentHP = parseInt(currentCellValues[0]);
let currentDMG = parseInt(currentCellValues[1]);
let currentMoney = parseInt(currentCellValues[2]);



// Tu Można dodawac dowolne efekty z unikalnych kart ----------------------------------------------------------------------------------
if (oblicz>=1) {
  if (currentMoney==1){
    highlightedHP +=1;
  } else if (currentMoney==2){
  highlightedHP +=2;
  } 


// Tu jak to przeciwnik a nie specjalna karta
else{
  currentHP -= highlightedDMG
  if (currentHP > 0 ) {
    let edycjaObrażeń = (currentDMG-=armor);
    if (edycjaObrażeń>1){
      highlightedHP -= edycjaObrażeń;
    }
    else {
      highlightedHP -=1;
    } 
  } 
  

  highlightedMoney += currentMoney;
  }
  oblicz = 0;
}

// Ogranicza życie do max jak przekroczysz
if (highlightedHP > maxHP) {
  highlightedHP = maxHP;
}






// To cuś robi że updatuje ci obecną komórkę na gracza i pokazuje jego wynik
cells[currentCellIndex].classList.add('highlighted'); // Dodanie klasy 'highlighted' do aktualnej komórki
cells[currentCellIndex].textContent = generateCellValue(highlightedHP, highlightedDMG, highlightedMoney);


// Wyświetlanie statystyk obok pola ------------------------------------------------------------------------------------------------------------------
function updateStats() {
  const hpValue = document.getElementById('hpValue');
  const dmgValue = document.getElementById('dmgValue');
  const moneyValue = document.getElementById('moneyValue');

  const highlightedValues = cells[currentCellIndex].textContent.split('-');
  const highlightedHP = parseInt(highlightedValues[0]);
  const highlightedDMG = parseInt(highlightedValues[1]);
  const highlightedMoney = parseInt(highlightedValues[2]);

  hpValue.textContent = highlightedHP;
  dmgValue.textContent = highlightedDMG;
  moneyValue.textContent = highlightedMoney;
  armorValue.textContent = armor;     // <---- do zmiany jak będzie aktywnie zmieniany
}
updateStats();


localStorage.setItem('highlightedMoney', highlightedMoney);
console.log('Zapisano wartość do Local Storage:', highlightedMoney); // <-- sprawdza czy zapisano w pamieci ilosc aktualnych monet
 // zapisywanie w pamieci  
if(highlightedHP <= 0){  // <-- Sprawdzenie czy gracz nie przegrał
  GameOver() 
}


});



function GameOver() {
  // Wyświetl powiadomienie o przegranej
  //   alert('Przegrałeś!'); <--- to pokazuje alert o przegranej
  // Zresetuj grę lub przekieruj na stronę startową
  resetGame();
}
function resetGame() {
  // Możesz dodać tutaj kod do zresetowania gry, np. przywrócenie punktów życia do początkowej wartości
  window.location.href = '../End/end.html';
}
