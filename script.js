// Seleccionamos el botón por su ID
const boton = document.getElementById('btnIngresar');

// Agregamos el evento de clic
boton.addEventListener('click', () => {
    const url = 'https://confianzaseguridad772-max.github.io/vamos-gp/';
    
    // Redirigir en la misma pestaña
    window.location.href = url;

    // Si prefieres que se abra en una pestaña nueva, usa:
    // window.open(url, '_blank');
});
