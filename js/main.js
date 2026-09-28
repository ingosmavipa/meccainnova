let slideActual = 0;
const slides = document.querySelectorAll('.carrusel-slide');
const puntos = document.querySelectorAll('.punto');
let intervaloCarrusel;

function mostrarSlide(index) {
    if (index >= slides.length) slideActual = 0;
    else if (index < 0) slideActual = slides.length - 1;
    else slideActual = index;

    slides.forEach(slide => slide.classList.remove('activa'));
    puntos.forEach(punto => punto.classList.remove('activo'));

    slides[slideActual].classList.add('activa');
    puntos[slideActual].classList.add('activo');
}

function siguienteSlide() {
    mostrarSlide(slideActual + 1);
}

function irASlide(index) {
    mostrarSlide(index);
    reiniciarIntervalo();
}

// Iniciar cambio automático cada 5 segundos
function iniciarCarrusel() {
intervaloCarrusel = setInterval(siguienteSlide, 10000);
}

function reiniciarIntervalo() {
    clearInterval(intervaloCarrusel);
    iniciarCarrusel();
}

// Control por arrastre de mouse (Swipe / Drag)
let posInicialX = 0;
let posFinalX = 0;
const banner = document.querySelector('.hero-banner');

banner.addEventListener('mousedown', (e) => {
    posInicialX = e.clientX;
});

banner.addEventListener('mouseup', (e) => {
    posFinalX = e.clientX;
    handleSwipe();
});

// Soporte también para celulares/tactil (por si acaso)
banner.addEventListener('touchstart', (e) => {
    posInicialX = e.touches[0].clientX;
});

banner.addEventListener('touchend', (e) => {
    posFinalX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const umbral = 50; // Mínimo de movimiento para cambiar de slide
    if (posInicialX - posFinalX > umbral) {
        // Arrastro a la izquierda -> Siguiente
        siguienteSlide();
        reiniciarIntervalo();
    } else if (posFinalX - posInicialX > umbral) {
        // Arrastro a la derecha -> Anterior
        mostrarSlide(slideActual - 1);
        reiniciarIntervalo();
    }
}

// Arranca el carrusel al cargar la página
iniciarCarrusel();
function abrirDetalleDesdeCard(card) {
    let titulo = card.querySelector('h3').innerText;
    let precio = card.querySelector('p').innerText;
    let stock = card.querySelector('span').innerText;
    let imagen = card.querySelector('img').src;
    
    // Lee la descripción personalizada, o usa una por defecto si no la tiene
    let descripcion = card.getAttribute('data-descripcion') || "Instrumento de alta calidad para mediciones electrónicas precisas.";

    document.getElementById('detalle-titulo').innerText = titulo;
    document.getElementById('detalle-precio').innerText = precio;
    document.getElementById('detalle-stock').innerText = stock;
    document.getElementById('detalle-img-principal').src = imagen;
    document.getElementById('detalle-descripcion').innerText = descripcion;

    document.getElementById('vista-detalle-producto').style.display = 'flex';
}
