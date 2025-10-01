    // Obtener canvas y contexto
    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");

    // Ajustar tamaño
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // Caracteres de Matrix
    const chars = "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワヰヱヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const letters = chars.split("");

    const fontSize = 16;
    const columns = canvas.width / fontSize; // columnas de caracteres
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1; // iniciar en la parte superior
    }

    function draw() {
      // Fondo negro semitransparente (deja estela)
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#332FD0"; // Verde Matrix
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // reiniciar cuando llegue al final
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    setInterval(draw, 50); // ~30fps

    // Redimensionar al cambiar ventana
    window.addEventListener("resize", () => {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
    });