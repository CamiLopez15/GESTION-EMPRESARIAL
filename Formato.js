// Lógica del video y temporizador
    const video = document.getElementById('mainVideo');
    const timerContainer = document.getElementById('timerContainer');
    const timerDisplay = document.getElementById('timerDisplay');
    const buttonsContainer = document.getElementById('buttonsContainer');
    const infoTextContainer = document.getElementById('infoTextContainer');
    const infoText = document.getElementById('infoText');
    
    let timerInterval;
    let timeRemaining = 60; // 1 minutos en segundos

    // Texto informativo que se mostrará
    const infoMessage = "escribiendo un mensaje se le da la instrucción ¿Cómo deseas enviar tu mensaje?";
    
    // Velocidad de escritura (milisegundos por caracter)
    const typingSpeed = 50;

    // Cuando el video empieza a reproducirse
    video.addEventListener('play', () => {
      typeWriter(infoMessage, 0);
    });

    // Cuando el video termina
    video.addEventListener('ended', () => {
      startTimer();
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
        }
      }, 1000);
    }

    function enableButtons() {
      buttonsContainer.classList.add('active');
      timerDisplay.textContent = '¡Tiempo terminado!';
      timerDisplay.style.color = '#00ff00';
    }

    // Opcional: Iniciar el texto automáticamente al cargar la página para pruebas
    // Descomenta la siguiente línea si quieres ver el texto sin reproducir el video
    // typeWriter(infoMessage, 0);