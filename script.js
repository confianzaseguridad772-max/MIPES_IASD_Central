// CONFIGURACIÓN DE FOTOS
const config = {
    evangelismo: ["gp1.jpeg", "gp2.jpeg", "gp3.jpeg", "santa1.jpeg", "santa2.jpeg", "santa3.jpeg", "santa4.jpeg", "santa5.jpeg"],
    escuelaSabatica: ["dis1.jpeg", "es1.jpeg", "es2.jpeg", "es3.jpeg", "ora1.jpeg"]
};

// CARGAR GALERÍAS CON EVENTO DE AMPLIACIÓN
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
                    <span class="likes-count">${Math.floor(Math.random() * 30) + 10}</span>
                </button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

renderGallery(config.evangelismo, "evangelismo", "galleryEvangelismo");
renderGallery(config.escuelaSabatica, "escuelasabatica", "galleryEscuelaSabatica");

// LÓGICA DEL LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');

function openLightbox(src) {
    lightbox.style.display = 'flex';
    lightboxImg.src = src;
}

closeBtn.onclick = () => lightbox.style.display = 'none';
lightbox.onclick = (e) => { if(e.target !== lightboxImg) lightbox.style.display = 'none'; };

// REDIRECCIONES Y LIKES
document.getElementById('btnIngresar').onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/vamos-gp/';
document.getElementById('btnDones').onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/Dones-IASD/';

function toggleLike(btn) {
    btn.classList.toggle('active');
    let span = btn.querySelector('.likes-count');
    let n = parseInt(span.innerText);
    span.innerText = btn.classList.contains('active') ? n + 1 : n - 1;
}

// ENVÍO A GOOGLE SHEETS
document.getElementById('prayerForm').onsubmit = function(e) {
    e.preventDefault();
    const btn = document.getElementById('btnSubmit');
    btn.disabled = true;
    btn.innerHTML = "Procesando...";

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
        btn.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> ENVIAR PETICIÓN';
    });
};
