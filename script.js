// 1. Redirección de Botones
document.getElementById('btnIngresar').addEventListener('click', () => {
    window.location.href = 'https://confianzaseguridad772-max.github.io/vamos-gp/';
});

document.getElementById('btnDones').addEventListener('click', () => {
    window.location.href = 'https://confianzaseguridad772-max.github.io/Dones-IASD/';
});

// 2. Lista de fotos (Asegúrate de que estén en la carpeta "fotos")
const listaFotos = [
    { nombre: "Charito", archivo: "charito.jpg" },
    { nombre: "Cherry", archivo: "cherry.jpg" },
    { nombre: "Erika", archivo: "erika.jpg" },
    { nombre: "Gustabo", archivo: "gustabo.jpg" },
    { nombre: "Pedro", archivo: "pedro.jpg" },
    { nombre: "Raquel", archivo: "raquel.jpg" },
    { nombre: "Ricardo", archivo: "ricardo.jpg" }
];

const galleryGrid = document.getElementById('photoGallery');

// 3. Generar la galería
listaFotos.forEach(foto => {
    const card = document.createElement('div');
    card.className = 'card-foto';
    card.innerHTML = `
        <img src="fotos/${foto.archivo}" alt="${foto.nombre}">
        <div class="card-footer">
            <p>${foto.nombre}</p>
            <button class="btn-corazon" onclick="darCorazon(this)">
                <i class="fas fa-heart"></i>
                <span class="likes-count">0</span>
            </button>
        </div>
    `;
    galleryGrid.appendChild(card);
});

// 4. Lógica del Corazón
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
