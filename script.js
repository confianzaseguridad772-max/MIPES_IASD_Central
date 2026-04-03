// 1. CONFIGURACIÓN DE FOTOS
const config = {
    evangelismo: ["gp1.jpeg", "gp2.jpeg", "gp3.jpeg", "santa1.jpeg", "santa2.jpeg", "santa3.jpeg", "santa4.jpeg", "santa5.jpeg"],
    escuelaSabatica: ["dis1.jpeg", "es1.jpeg", "es2.jpeg", "es3.jpeg", "ora1.jpeg"]
};

// 2. REDIRECCIÓN DE BOTONES
document.getElementById('btnIngresar').onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/vamos-gp/';
document.getElementById('btnDones').onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/Dones-IASD/';

// 3. CARGA DE GALERÍAS (SIN NOMBRE DE ARCHIVO)
function renderGallery(lista, carpeta, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    lista.forEach(archivo => {
        const card = document.createElement('div');
        card.className = 'card-foto';
        card.innerHTML = `
            <img src="${carpeta}/${archivo}" alt="Iglesia Central" onerror="this.closest('.card-foto').remove()">
            <div class="card-footer">
                <button class="btn-corazon" onclick="toggleLike(this)">
                    <i class="fas fa-heart"></i>
                    <span class="likes-count">${Math.floor(Math.random() * 20) + 5}</span>
                </button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

renderGallery(config.evangelismo, "evangelismo", "galleryEvangelismo");
renderGallery(config.escuelaSabatica, "escuelasabatica", "galleryEscuelaSabatica");

// 4. SISTEMA DE REACCIONES AUTOMÁTICAS (+5 cada minuto)
setInterval(() => {
    document.querySelectorAll('.likes-count').forEach(contador => {
        let actual = parseInt(contador.innerText);
        contador.innerText = actual + 5;
    });
}, 60000);

// 5. LÓGICA DE LIKE MANUAL
function toggleLike(btn) {
    btn.classList.toggle('active');
    const span = btn.querySelector('.likes-count');
    let num = parseInt(span.innerText);
    span.innerText = btn.classList.contains('active') ? num + 1 : num - 1;
}

// 6. ENVÍO A WHATSAPP CORREGIDO
document.getElementById('prayerForm').onsubmit = function(e) {
    e.preventDefault();
    const nombre = document.getElementById('userName').value;
    const motivo = document.getElementById('prayerReason').value;
    const linkGrupo = "https://chat.whatsapp.com/J8uTU6IcZNOLxPLiLHW0Gr";
    
    // Preparamos el mensaje
    const mensaje = `🙏 *NUEVO PEDIDO DE ORACIÓN*%0A*Nombre:* ${nombre}%0A*Motivo:* ${motivo}`;
    
    // Enviamos primero el texto a WhatsApp para que el usuario lo copie/envíe
    // Y luego lo invitamos a unirse al grupo si no está.
    const urlTexto = `https://wa.me/?text=${mensaje}`;
    
    alert("Se abrirá WhatsApp para enviar tu pedido. ¡Luego no olvides unirte al grupo!");
    window.open(urlTexto, '_blank');
    
    // Después de un pequeño retraso, abrimos el link del grupo
    setTimeout(() => {
        window.location.href = linkGrupo;
    }, 3000);
};
