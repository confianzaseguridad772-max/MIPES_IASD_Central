// 1. CONFIGURACIÓN DE IMÁGENES
const config = {
    evangelismo: ["santa6.jpeg","santa7.jpeg","gp1.jpeg", "gp2.jpeg", "gp3.jpeg", "santa1.jpeg", "santa2.jpeg", "santa3.jpeg", "santa4.jpeg", "santa5.jpeg"],
    escuelaSabatica: ["dis1.jpeg", "es1.jpeg", "es2.jpeg", "es3.jpeg", "ora1.jpeg"]
};

// 2. RENDERIZAR GALERÍAS
function renderGallery(lista, carpeta, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
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

renderGallery(config.evangelismo, "evangelismo", "galleryEvangelismo");
renderGallery(config.escuelaSabatica, "escuelasabatica", "galleryEscuelaSabatica");

// 3. LÓGICA DE LIGHTBOX (AMPLIAR)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
    lightbox.style.display = 'flex';
    lightboxImg.src = src;
}

document.querySelector('.close-lightbox').onclick = () => lightbox.style.display = 'none';
lightbox.onclick = (e) => { if(e.target !== lightboxImg) lightbox.style.display = 'none'; };

// 4. LIKES E INTERACCIÓN
function toggleLike(btn) {
    btn.classList.toggle('active');
    let span = btn.querySelector('.likes-count');
    let n = parseInt(span.innerText);
    span.innerText = btn.classList.contains('active') ? n + 1 : n - 1;
}

setInterval(() => {
    document.querySelectorAll('.likes-count').forEach(c => c.innerText = parseInt(c.innerText) + 5);
}, 60000);

// 5. REDIRECCIONES Y ENVÍO A GOOGLE SHEETS
document.getElementById('btnIngresar').onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/vamos-gp/';
document.getElementById('btnDones').onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/Dones-IASD/';

document.getElementById('prayerForm').onsubmit = function(e) {
    e.preventDefault();
    const btn = document.getElementById('btnSubmit');
    btn.disabled = true;
    btn.innerHTML = "Enviando...";

    const datos = {
        nombre: document.getElementById('userName').value,
        celular: document.getElementById('userPhone').value,
        direccion: document.getElementById('userAddress').value,
        motivo: document.getElementById('prayerReason').value
    };

    const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbxGrqRcVH8wfgBKhPv4g76F_9XfFxsiHjyIN_mCaaMlFY2P2iL9s-3P3TQfk6CtbzE/exec";

    fetch(URL_SCRIPT, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(datos)
    }).then(() => {
        alert("¡Pedido registrado! Estaremos orando por ti.");
        document.getElementById('prayerForm').reset();
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-text">ENVIAR PETICIÓN</span> <i class="fas fa-paper-plane"></i>';
    });
};
