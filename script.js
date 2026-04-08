// 1. CONFIGURACIÓN DE IMÁGENES
const config = {
    evangelismo: [
        "santa6.jpeg", "santa7.jpeg", "gp1.jpeg", "gp2.jpeg", "gp3.jpeg", 
        "santa1.jpeg", "santa2.jpeg", "santa3.jpeg", "santa4.jpeg", "santa5.jpeg"
    ],
    escuelaSabatica: [
        "dis1.jpeg", "es1.jpeg", "es2.jpeg", "es3.jpeg", "ora1.jpeg"
    ]
};

// 2. RENDERIZAR GALERÍAS
function renderGallery(lista, carpeta, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return; // Seguridad por si el ID no existe

    lista.forEach(archivo => {
        const card = document.createElement('div');
        card.className = 'card-foto';
        card.innerHTML = `
            <img src="${carpeta}/${archivo}" alt="MIPES" onclick="openLightbox(this.src)">
            <div class="card-footer">
                <button class="btn-corazon" onclick="toggleLike(this)">
                    <i class="fas fa-heart"></i>
                    <span class="likes-count">${Math.floor(Math.random() * 40) + 20}</span>
                </button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// Inicializar galerías
renderGallery(config.evangelismo, "evangelismo", "galleryEvangelismo");
renderGallery(config.escuelaSabatica, "escuelasabatica", "galleryEscuelaSabatica");

// 3. LÓGICA DE LIGHTBOX (AMPLIAR FOTOS)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
    lightbox.style.display = 'flex';
    lightboxImg.src = src;
}

document.querySelector('.close-lightbox').onclick = () => lightbox.style.display = 'none';

lightbox.onclick = (e) => { 
    if (e.target !== lightboxImg) lightbox.style.display = 'none'; 
};

// 4. LIKES E INTERACCIÓN
function toggleLike(btn) {
    btn.classList.toggle('active');
    let span = btn.querySelector('.likes-count');
    let n = parseInt(span.innerText);
    span.innerText = btn.classList.contains('active') ? n + 1 : n - 1;
}

// Simulación de actividad (Sube likes cada minuto para dar vida a la web)
setInterval(() => {
    document.querySelectorAll('.likes-count').forEach(c => {
        if (Math.random() > 0.7) { // Solo algunos suben aleatoriamente
            c.innerText = parseInt(c.innerText) + 1;
        }
    });
}, 60000);

// 5. REDIRECCIONES
document.getElementById('btnIngresar').onclick = () => {
    window.location.href = 'https://confianzaseguridad772-max.github.io/vamos-gp/';
};

document.getElementById('btnDones').onclick = () => {
    window.location.href = 'https://confianzaseguridad772-max.github.io/Dones-IASD/';
};

// 6. ENVÍO A GOOGLE SHEETS (Optimizado con Async/Await)
document.getElementById('prayerForm').onsubmit = async function(e) {
    e.preventDefault();
    
    const btn = document.getElementById('btnSubmit');
    const originalContent = btn.innerHTML;
    
    // Bloquear botón y mostrar carga
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';

    // Recopilar datos
    const datos = {
        nombre: document.getElementById('userName').value,
        celular: document.getElementById('userPhone').value,
        direccion: document.getElementById('userAddress').value,
        motivo: document.getElementById('prayerReason').value,
        fecha: new Date().toLocaleString() // Añadimos fecha automáticamente
    };

    const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbx2gUFv6fMo7vu5UvbMEJo-7pSLbzDlOjU7iLviNIikVKvIB7pWNVxM2PrTGIBXtO7v/exec";

    try {
        // Usamos URLSearchParams para que el Apps Script lo reciba más fácil como parámetros
        const params = new URLSearchParams(datos);

        await fetch(`${URL_SCRIPT}?${params.toString()}`, {
            method: "POST",
            mode: "no-cors"
        });

        // Feedback de éxito
        alert("¡Pedido registrado! Estaremos orando por ti.");
        document.getElementById('prayerForm').reset();
        
    } catch (error) {
        console.error("Error al enviar:", error);
        alert("Hubo un pequeño error. Por favor, intenta enviarlo de nuevo.");
    } finally {
        // Restaurar botón
        btn.disabled = false;
        btn.innerHTML = originalContent;
    }
};
