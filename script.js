// ==========================================
// 1. REDIRECCIÓN DE BOTONES
// ==========================================
const btnIngresar = document.getElementById('btnIngresar');
const btnDones = document.getElementById('btnDones');

if (btnIngresar) {
    btnIngresar.onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/vamos-gp/';
}

if (btnDones) {
    btnDones.onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/Dones-IASD/';
}

// ==========================================
// 2. CONFIGURACIÓN DE FOTOS (MIPES Tingo María)
// ==========================================
// Instrucciones: Cuando subas una foto nueva a la carpeta "fotos", 
// solo agrega su nombre exacto (con .jpg o .png) a esta lista:
const misFotos = [
    "charito.jpg", 
    "cherry.jpg", 
    "erika.jpg", 
    "gustabo.jpg", 
    "pedro.jpg", 
    "raquel.jpg", 
    "ricardo.jpg"
];

// ==========================================
// 3. GENERACIÓN AUTOMÁTICA DE LA GALERÍA
// ==========================================
const galleryGrid = document.getElementById('photoGallery');

if (galleryGrid) {
    misFotos.forEach(archivo => {
        // Creamos un título limpio quitando la extensión (.jpg)
        const tituloLimpio = archivo.split('.')[0].replace(/-/g, ' ');

        const card = document.createElement('div');
        card.className = 'card-foto';
        
        // El atributo 'onerror' hace que si la foto no carga, el cuadro desaparezca solo
        card.innerHTML = `
            <img src="fotos/${archivo}" alt="${tituloLimpio}" onerror="this.closest('.card-foto').remove()">
            <div class="card-footer">
                <p style="text-transform: capitalize;">${tituloLimpio}</p>
                <button class="btn-corazon" onclick="darCorazon(this)">
                    <i class="fas fa-heart"></i>
                    <span class="likes-count">0</span>
                </button>
            </div>
        `;
        galleryGrid.appendChild(card);
    });
}

// ==========================================
// 4. LÓGICA DEL CORAZONCITO (LIKE)
// ==========================================
function darCorazon(btn) {
    const countSpan = btn.querySelector('.likes-count');
    let currentLikes = parseInt(countSpan.innerText);

    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        countSpan.innerText = currentLikes - 1;
    } else {
        btn.classList.add('active');
        countSpan.innerText = currentLikes + 1;
    }
}
