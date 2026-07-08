// --- LÓGICA DEL SLIDER ---
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
let currentSlide = 0;
let slideInterval;

function initSlider() {
    // Si hay slides, comenzar el intervalo
    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }
}

function showSlide(index) {
    // Remover clase activa de todos
    slides.forEach(slide => slide.classList.remove('active'));
    // Ajustar el índice si sale de los límites
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    // Agregar clase activa al actual
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
    resetInterval();
}

function prevSlide() {
    showSlide(currentSlide - 1);
    resetInterval();
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

// Event Listeners para los botones
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Iniciar
initSlider();