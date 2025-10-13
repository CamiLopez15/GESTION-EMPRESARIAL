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
const infoMessage = "Me detectaron... Activaron algún sistema de alerta y ahora saben que estoy aquí. Es hora de retirarme antes de que rastreen mi ubicación. Hoy no será mi día, pero volveré.";

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
