// Zmienna do przechowywania informacji o ostatnio wybranym obrazku
let ostatniWybranyObrazek = null;

// Funkcja obsługująca kliknięcie na obrazek
function selectImage(imageNumber) {
  ostatniWybranyObrazek = imageNumber;
  console.log('Wybrałeś obrazek:', imageNumber);
  console.log('Aktualnie wybrany obraz:', ostatniWybranyObrazek);
  localStorage.setItem('ostatniWybranyObrazek', imageNumber);
}

/* Dodanie event listenerów do obrazków
document.getElementById('postac1').addEventListener('click', function() {
  selectImage(1);
});

document.getElementById('postac2').addEventListener('click', function() {
  selectImage(2);
});

document.getElementById('postac3').addEventListener('click', function() {
  selectImage(3);
}); */

// Dodanie event listenera do przycisku 'start-button'

document.getElementById('start-button').addEventListener('click', function() {
  // Tutaj dodaj kod do przejścia do ekranu gry lub inicjalizacji gry.
  window.location.href = '../Main/main.html';
  console.log('Rozpocznij grę!');
});
