// Lógica del video y temporizador
const video = document.getElementById('mainVideo');
const timerContainer = document.getElementById('timerContainer');
const timerDisplay = document.getElementById('timerDisplay');
const buttonsContainer = document.getElementById('buttonsContainer');
const infoTextContainer = document.getElementById('infoTextContainer');
const infoText = document.getElementById('infoText');

let timerInterval;
let timeRemaining = 90; // 1:30 segundos
let typingFinished = false;
let hasStarted = false;

// Texto informativo que se mostrará
const infoMessage = "¡Misión cumplida! El mensaje llegó intacto, protegido y sin interferencias. Tomé todas las precauciones necesarias: división del mensaje, verificación de identidad y comprobación de integridad. La seguridad siempre vale el esfuerzo extra.";
const typingSpeed = 50;

// Hacer que el video sea un bucle
video.loop = true;

// Función para iniciar todo
function startEverything() {
  if (!hasStarted) {
    hasStarted = true;
    video.play().then(() => {
      console.log("Video reproduciendo automáticamente");
    }).catch(error => {
      console.log("Error al reproducir:", error);
    });
  }
}

// Intentar reproducir cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  startEverything();
});

// También intentar cuando la página cargue completamente
window.addEventListener('load', () => {
  startEverything();
});

// Intentar reproducir cuando el usuario haga cualquier interacción
document.addEventListener('click', () => {
  startEverything();
}, { once: true });

// Cuando el video empieza a reproducirse
video.addEventListener('play', () => {
  if (!typingFinished) {
    typeWriter(infoMessage, 0);
  }
});

function typeWriter(text, index) {
  if (index === 0) {
    infoTextContainer.classList.remove('hidden');
    infoTextContainer.classList.add('active');
    infoText.textContent = '';
    infoText.classList.remove('finished');
  }
  
  if (index < text.length) {
    infoText.textContent += text.charAt(index);
    setTimeout(() => typeWriter(text, index + 1), typingSpeed);
  } else {
    infoText.classList.add('finished');
    typingFinished = true;
    // Iniciar el temporizador cuando termine de escribir el texto
    startTimer();
  }
}

function startTimer() {
  timerContainer.classList.remove('hidden');
  
  timerInterval = setInterval(() => {
    timeRemaining--;
    
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Advertencia cuando quedan 10 segundos
    if (timeRemaining <= 10 && timeRemaining > 0) {
      timerDisplay.style.color = '#FF6B6B';
      timerDisplay.style.animation = 'pulse 0.5s infinite';
    }
    
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      enableButtons();
      // Esperar 2 segundos antes de seleccionar un botón aleatorio
      setTimeout(() => {
        selectRandomButton();
      }, 2000);
    }
  }, 1000);
}

function enableButtons() {
  buttonsContainer.classList.add('active');
  timerDisplay.textContent = '¡Tiempo terminado!';
  timerDisplay.style.color = '#00ff00';
}
