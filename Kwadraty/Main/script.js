//Wyświetlanie w kosoli jaki obrazek został wybrany początkowy
document.addEventListener('DOMContentLoaded', function() {
  // Pobierz zmienną z localStorage
  const ostatniWybranyObrazek = localStorage.getItem('ostatniWybranyObrazek');
  
  // Sprawdź, czy zmienna istnieje i wyświetl w konsoli
  if (ostatniWybranyObrazek !== null) {
    console.log('Ostatni wybrany obrazek:', ostatniWybranyObrazek);
  } else {
    console.log('Nie wybrano jeszcze obrazka.');
  }
});






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
        Math.floor(Math.random() * 15 + 1),
        Math.floor(Math.random() * 15 + 1),
        Math.floor(Math.random() * 5 + 1)
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
      if (cellMoney <= 2) {
        cellDMG = 0;
        cellHP = 0;
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

  console.log('Wartości z komórki highlighted:', highlightedHP, highlightedDMG, highlightedMoney);

  // To zmioenia poprzednio okupowaną komórke na losową
  cells[currentCellIndex].textContent = generateCellValue(
    Math.floor(Math.random() * 15 + 1),
    Math.floor(Math.random() * 15 + 1),
    Math.floor(Math.random() * 5 + 1)
  );
  cells[currentCellIndex].classList.remove('highlighted'); // Usunięcie klasy 'highlighted' z poprzedniej komórki

  // Warunki obsługujące ruch po siatce w zależności od naciśniętego klawisza
  if (event.key === 'a' && currentCellIndex % 5 !== 0) {
    currentCellIndex -= 1,
    steps += 1,
    oblicz += 1;
  } else if (event.key === 'w' && currentCellIndex >= 5) {
    currentCellIndex -= 5,
    steps += 1,
    oblicz += 1;
  } else if (event.key === 'd' && currentCellIndex % 5 !== 4) {
    currentCellIndex += 1,
    steps += 1,
    oblicz += 1;
  } else if (event.key === 's' && currentCellIndex < 20) {
    currentCellIndex += 5,
    steps += 1,
    oblicz += 1;
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
  }
else if (currentMoney==2){
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
