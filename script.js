// 1. LISTA DE FOTOS POR CARPETA
const config = {
    evangelismo: ["gp1.jpeg", "gp2.jpeg", "gp3.jpeg", "santa1.jpeg", "santa2.jpeg", "santa3.jpeg", "santa4.jpeg", "santa5.jpeg"],
    escuelaSabatica: ["dis1.jpeg", "es1.jpeg", "es2.jpeg", "es3.jpeg", "ora1.jpeg"]
};

// 2. REDIRECCIONES
document.getElementById('btnIngresar').onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/vamos-gp/';
document.getElementById('btnDones').onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/Dones-IASD/';

// 3. CARGAR GALERÍAS (SIN NOMBRES DE ARCHIVO)
function renderGallery(lista, carpeta, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    lista.forEach(archivo => {
        const card = document.createElement('div');
        card.className = 'card-foto';
        card.innerHTML = `
            <img src="${carpeta}/${archivo}" alt="MIPES" onerror="this.closest('.card-foto').remove()">
            <div class="card-footer">
                <button class="btn-corazon" onclick="toggleLike(this)">
                    <i class="fas fa-heart"></i>
                    <span class="likes-count">${Math.floor(Math.random() * 25) + 15}</span>
                </button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

renderGallery(config.evangelismo, "evangelismo", "galleryEvangelismo");
renderGallery(config.escuelaSabatica, "escuelasabatica", "galleryEscuelaSabatica");

// 4. REACCIONES AUTOMÁTICAS (+5 CADA MINUTO)
setInterval(() => {
    document.querySelectorAll('.likes-count').forEach(contador => {
        contador.innerText = parseInt(contador.innerText) + 5;
    });
}, 60000);

function toggleLike(btn) {
    btn.classList.toggle('active');
    let span = btn.querySelector('.likes-count');
    let num = parseInt(span.innerText);
    span.innerText = btn.classList.contains('active') ? num + 1 : num - 1;
}

// 5. ENVÍO AL EXCEL DE GOOGLE
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

    // REEMPLAZA ESTO CON TU URL DE GOOGLE APPS SCRIPT
    const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbxGrqRcVH8wfgBKhPv4g76F_9XfFxsiHjyIN_mCaaMlFY2P2iL9s-3P3TQfk6CtbzE/exec";

    fetch(URL_SCRIPT, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        body: JSON.stringify(datos)
    }).then(() => {
        alert("¡Pedido de oración registrado! Estaremos orando por ti.");
        document.getElementById('prayerForm').reset();
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> ENVIAR PETICIÓN';
    }).catch(() => {
        alert("Error al conectar. Verifica tu conexión.");
        btn.disabled = false;
    });
};
