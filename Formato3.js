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
let isTyping = false; // Nueva variable para controlar si ya está escribiendo

// Texto informativo que se mostrará
const infoMessage = "¡Confirmado! Acabo de verificar la identidad del receptor mediante nuestra pregunta de seguridad secreta. Es realmente él. Este paso extra valió la pena para estar segura de que estoy hablando con la persona correcta.";

// Velocidad de escritura (milisegundos por caracter)
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

// Cuando el video empieza a reproducirse (solo la primera vez)
video.addEventListener('play', () => {
  if (!isTyping && !typingFinished) {
    typeWriter(infoMessage, 0);
  }
});

function typeWriter(text, index) {
  if (index === 0) {
    isTyping = true; // Marcar que está escribiendo
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
    isTyping = false; // Terminar de escribir
    // Iniciar el temporizador cuando termine de escribir el texto
    startTimer();
  }
}

function startTimer() {
  // Solo iniciar el temporizador si no se ha iniciado ya
  if (timerInterval) return;
  
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
      // Esperar 2 segundos antes de ir a video7.2.html
      setTimeout(() => {
        goToTimeoutPage();
      }, 2000);
    }
  }, 1000);
}

function enableButtons() {
  buttonsContainer.classList.add('active');
  timerDisplay.textContent = '¡Tiempo terminado!';
  timerDisplay.style.color = '#00ff00';
}

function goToTimeoutPage() {
  // Navegar directamente a video7.3.html cuando se acabe el tiempo
  window.location.href = 'Video7.3.html';
}