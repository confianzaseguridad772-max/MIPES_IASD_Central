// 1. CONFIGURACIÓN DE RUTAS Y FOTOS
const config = {
    evangelismo: ["gp1.jpeg", "gp2.jpeg", "gp3.jpeg", "santa1.jpeg", "santa2.jpeg", "santa3.jpeg", "santa4.jpeg", "santa5.jpeg"],
    escuelaSabatica: ["dis1.jpeg", "es1.jpeg", "es2.jpeg", "es3.jpeg", "ora1.jpeg"]
};

// 2. REDIRECCIÓN DE BOTONES
document.getElementById('btnIngresar').onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/vamos-gp/';
document.getElementById('btnDones').onclick = () => window.location.href = 'https://confianzaseguridad772-max.github.io/Dones-IASD/';

// 3. CARGA DE GALERÍAS
function renderGallery(lista, carpeta, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    lista.forEach(archivo => {
        const idUnico = `${carpeta}-${archivo.split('.')[0]}`;
        const card = document.createElement('div');
        card.className = 'card-foto';
        card.innerHTML = `
            <img src="${carpeta}/${archivo}" alt="MIPES" onerror="this.closest('.card-foto').remove()">
            <div class="card-footer">
                <p style="text-transform: capitalize; font-size: 0.8rem;">${archivo.split('.')[0]}</p>
                <button class="btn-corazon" data-id="${idUnico}" onclick="toggleLike(this)">
                    <i class="fas fa-heart"></i>
                    <span class="likes-count">${Math.floor(Math.random() * 50) + 10}</span>
                </button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

renderGallery(config.evangelismo, "evangelismo", "galleryEvangelismo");
renderGallery(config.escuelaSabatica, "escuelasabatica", "galleryEscuelaSabatica");

// 4. SISTEMA DE REACCIONES AUTOMÁTICAS (5 por minuto)
setInterval(() => {
    const todosLosContadores = document.querySelectorAll('.likes-count');
    todosLosContadores.forEach(contador => {
        let actual = parseInt(contador.innerText);
        contador.innerText = actual + 5; // Suma 5 reacciones automáticamente
    });
    console.log("Reacciones actualizadas automáticamente (+5)");
}, 60000); // 60000 ms = 1 minuto

// 5. LÓGICA DE LIKE MANUAL
function toggleLike(btn) {
    btn.classList.toggle('active');
    const span = btn.querySelector('.likes-count');
    let num = parseInt(span.innerText);
    span.innerText = btn.classList.contains('active') ? num + 1 : num - 1;
}

// 6. FORMULARIO DE ORACIÓN -> WHATSAPP
document.getElementById('prayerForm').onsubmit = function(e) {
    e.preventDefault();
    const nombre = document.getElementById('userName').value;
    const motivo = document.getElementById('prayerReason.').value;
    
    const mensaje = `🙏 *PEDIDO DE ORACIÓN - MIPES TINGO MARÍA*%0A%0A*Nombre:* ${nombre}%0A*Motivo:* ${motivo}%0A%0A_Enviado desde la plataforma oficial._`;
    const urlWhatsapp = `https://wa.me/?text=${mensaje}`;
    
    // Si quieres que vaya directo al grupo, usamos el link del grupo:
    // Pero WhatsApp por seguridad no permite enviar texto directo a un enlace de invitación de grupo automáticamente.
    // Lo enviamos para que el usuario lo comparta o lo mande a un contacto.
    window.open(urlWhatsapp, '_blank');
};
