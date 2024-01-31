// Zmienna do przechowywania informacji o ostatnio wybranym obrazku
let ostatniWybranyObrazek = null;


function showText(text) {
  // Znajdź element o id "output"
  var outputElement = document.getElementById('opis');
  outputElement.innerHTML = text;
}



// Funkcja obsługująca kliknięcie na obrazek
function selectImage(imageNumber) {
  // Jeżeli obecny obrazek jest już zaznaczony, przerwij wykonanie funkcji
  if (imageNumber === ostatniWybranyObrazek) {
    return;
  }

  // Przywracamy styl dla poprzednio wybranego obrazka (jeśli był taki)
  if (ostatniWybranyObrazek !== null) {
    document.getElementById(`postac${ostatniWybranyObrazek}`).style.border = '1px solid #ccc';
    document.getElementById(`postac${ostatniWybranyObrazek}`).style.transform = 'scale(1)';
  }

  // Zaznaczamy nowo wybrany obrazek
  ostatniWybranyObrazek = imageNumber;
  const obrazek = document.getElementById(`postac${imageNumber}`);
  obrazek.style.border = '2px solid #244E52';
  obrazek.style.transform = 'scale(1.1)';

  console.log('Aktualnie wybrany obraz:', ostatniWybranyObrazek);
  localStorage.setItem('ostatniWybranyObrazek', imageNumber);
}

// Dodanie event listenerów do obrazków
document.getElementById('postac1').addEventListener('click', function() {
  showText('PHOENIX<br>Using spell wil attack everyone that shares row with you');
  selectImage(1);
});

document.getElementById('postac2').addEventListener('click', function() {
  showText('UNICORN<br>Using Skill will swap you witch chosen enemy and attack him. If you kill this way skill resets');
  selectImage(2);
});

document.getElementById('postac3').addEventListener('click', function() {
  showText('DRAGON<br>Using skill will instantly kill any enemy and heal you for his amount of HP');
  selectImage(3);
});

// Dodanie event listenera do przycisku 'start-button'
document.getElementById('start-button').addEventListener('click', function() {
  // Tutaj dodaj kod do przejścia do ekranu gry lub inicjalizacji gry.
  window.location.href = '../Main/main.html';
  console.log('Rozpocznij grę!');
});
