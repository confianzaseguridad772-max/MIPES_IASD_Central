// 1. CONFIGURACIÓN DE IMÁGENES
const config = {
    evangelismo: ["santa6.jpeg","santa7.jpeg","gp1.jpeg", "gp2.jpeg", "gp3.jpeg", "santa1.jpeg", "santa2.jpeg", "santa3.jpeg", "santa4.jpeg", "santa5.jpeg"],
    escuelaSabatica: ["dis1.jpeg", "es1.jpeg", "es2.jpeg", "es3.jpeg", "ora1.jpeg"]
};

// 2. RENDERIZAR GALERÍAS
function renderGallery(lista, carpeta, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if(!contenedor) return;
    contenedor.innerHTML = ""; // Limpieza de seguridad
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

// 3. LÓGICA DE LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
function openLightbox(src) { lightbox.style.display = 'flex'; lightboxImg.src = src; }
document.querySelector('.close-lightbox').onclick = () => lightbox.style.display = 'none';
lightbox.onclick = (e) => { if(e.target !== lightboxImg) lightbox.style.display = 'none'; };

// 4. LIKES
function toggleLike(btn) {
    btn.classList.toggle('active');
    let span = btn.querySelector('.likes-count');
    let n = parseInt(span.innerText);
    span.innerText = btn.classList.contains('active') ? n + 1 : n - 1;
}

// 5. REDIRECCIONES MODERNAS
document.getElementById('btnIngresar').onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/vamos-gp/';
document.getElementById('btnAsistencia').onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/Asistencia/';
document.getElementById('btnDones').onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/Dones-IASD/';
document.getElementById('btnTermometro').onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/estadisticaMIPES/';

// 6. ENVÍO DE ORACIÓN (ELEGANTE)
const prayerForm = document.getElementById('prayerForm');
const prayerContent = document.getElementById('prayerContent');
const successMessage = document.getElementById('successMessage');

prayerForm.onsubmit = function(e) {
    e.preventDefault();
    const btn = document.getElementById('btnSubmit');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';

    const nombre = document.getElementById('userName').value;
    const celular = document.getElementById('userPhone').value;
    const direccion = document.getElementById('userAddress').value;
    const motivo = document.getElementById('prayerReason').value;

    const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbwjLzcYHSyCSayBk_Es1YJYYfppMYcf0-mtYdtYMtVhXuztq3eFxCvIyLZOetYU6PHm/exec";
    const urlFinal = `${URL_SCRIPT}?nombre=${encodeURIComponent(nombre)}&celular=${encodeURIComponent(celular)}&direccion=${encodeURIComponent(direccion)}&motivo=${encodeURIComponent(motivo)}`;

    fetch(urlFinal, { method: "GET", mode: "no-cors" })
    .then(() => {
        prayerContent.style.display = 'none';
        successMessage.style.display = 'block';
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Lo sentimos, hubo un error técnico. Intenta nuevamente.");
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-text">ENVIAR PETICIÓN</span> <i class="fas fa-paper-plane"></i>';
    });
};

function resetPrayerForm() {
    prayerForm.reset();
    successMessage.style.display = 'none';
    prayerContent.style.display = 'block';
    const btn = document.getElementById('btnSubmit');
    btn.disabled = false;
    btn.innerHTML = '<span class="btn-text">ENVIAR PETICIÓN</span> <i class="fas fa-paper-plane"></i>';
}
