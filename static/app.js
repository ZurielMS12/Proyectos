document.addEventListener('DOMContentLoaded', () => {
    // Menú hamburguesa
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    const flashMessages = document.getElementById('flash-messages');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Recolectar datos del formulario
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch('/send_email', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            // Mostrar mensaje de éxito o error
            showFlashMessage(data.success ? 'success' : 'error', data.message);
            
            if (data.success) {
                contactForm.reset();
            }
        } catch (error) {
            showFlashMessage('error', 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
        }
    });

    // Función para mostrar mensajes flash
    function showFlashMessage(type, message) {
        const flashMessage = document.createElement('div');
        flashMessage.className = `flash-message flash-${type}`;
        flashMessage.textContent = message;

        flashMessages.appendChild(flashMessage);

        // Remover el mensaje después de 5 segundos
        setTimeout(() => {
            flashMessage.remove();
        }, 5000);
    }
});

// Carrusel de imágenes
const carouselSlides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    // Remover active de todos los slides y dots
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Mostrar slide y dot correspondiente
    carouselSlides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselSlides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    showSlide(currentSlide);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 6000);
}

// Event Listeners
document.querySelector('.next-btn').addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        resetAutoSlide();
    });
});

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Iniciar carrusel
startAutoSlide();