// ==========================================
// 1. SELECTORES GLOBALES Y CONTROL DE MENÚ (HAMBURGUESA)
// ==========================================
const menuToggle = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// ==========================================
// 2. OCULTAR HEADER AL BAJAR SCROLL, MOSTRAR AL SUBIR
// ==========================================
let lastScrollTop = 0;
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;
    }, { passive: true });
}

// ==========================================
// 3. DESPLAZAMIENTO SUAVE DEL NAVBAR (ANCLAS)
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            // Cerrar menú móvil si está abierto
            if (navbar && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                const icon = menuToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// 4. FUNCIONALIDAD DE VIDEO DE REELS (REPLAY CONTROLS)
// ==========================================
const reels = document.querySelectorAll('.reel-item');

reels.forEach(reel => {
    const video = reel.querySelector('.video-reel');
    const btnPlay = reel.querySelector('.play-btn');

    if (video && btnPlay) {
        btnPlay.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                btnPlay.classList.add('hidden');
            } else {
                video.pause();
                btnPlay.classList.remove('hidden');
            }
        });

        video.addEventListener('click', () => {
            video.pause();
            btnPlay.classList.remove('hidden');
        });
    }
});

// ==========================================
// 5. CONTROL DE MODALES GENERALES (PORTADAS Y REELS)
// ==========================================
const openButtons = document.querySelectorAll(".open-modal-btn");
const closeButtons = document.querySelectorAll(".close-modal-btn");
const modals = document.querySelectorAll(".modal-container");

function closeModal(modal) {
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = ""; // Restaura el scroll de fondo
    }
}

openButtons.forEach(button => {
    button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        const modal = document.getElementById(targetId);
        if (modal) {
            modal.classList.add("active");
            document.body.style.overflow = "hidden"; // Bloquea el scroll de fondo
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal-container");
        closeModal(modal);
    });
});

modals.forEach(modal => {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

// ==========================================
// 6. MODAL DE CONTACTO Y ENVÍO DE DATOS (EMAILJS & WHATSAPP)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const modalContacto = document.getElementById('modal-contacto');
    const botonesAbrir = document.querySelectorAll('.trigger-modal');
    const btnCerrarContacto = document.getElementById('btn-cerrar-contacto');
    const btnWhatsappForm = document.getElementById('btn-whatsapp');
    const btnCorreoForm = document.getElementById('btn-correo');

    if (botonesAbrir.length > 0 && modalContacto) {
        botonesAbrir.forEach(btn => {
            btn.addEventListener('click', () => {
                modalContacto.showModal();
            });
        });
    }

    if (btnCerrarContacto && modalContacto) {
        btnCerrarContacto.addEventListener('click', () => {
            modalContacto.close();
        });

        modalContacto.addEventListener('click', (e) => {
            const dialogDimensions = modalContacto.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                modalContacto.close();
            }
        });
    }

    if (btnWhatsappForm && btnCorreoForm) {
        btnWhatsappForm.addEventListener('click', function() {
            procesarFormulario('whatsapp');
        });

        btnCorreoForm.addEventListener('click', function() {
            procesarFormulario('correo');
        });
    }

    function procesarFormulario(metodo) {
        const nombresEl = document.getElementById('nombres');
        const apellidosEl = document.getElementById('apellidos');
        const correoEl = document.getElementById('correo');
        const marcaEl = document.getElementById('marca');

        if (!nombresEl || !apellidosEl || !marcaEl) return;

        const nombres = nombresEl.value.trim();
        const apellidos = apellidosEl.value.trim();
        const correo = correoEl ? correoEl.value.trim() : '';
        const marca = marcaEl.value.trim();

        if (!nombres || !apellidos || !marca) {
            alert("Por favor, completa todos los campos para continuar.");
            return;
        }

        const mensajeTexto = `Hola, *LAM STUDYO*. Me llamo *${nombres} ${apellidos}*${correo ? ` (${correo})` : ''} y deseo reservar una sesión.\n*Consulta:* ${marca}`;

        if (metodo === 'whatsapp') {
            const mensajeCodificado = encodeURIComponent(mensajeTexto);
            const numeroDestino = "51922787599";
            const urlWhatsapp = `https://wa.me/${numeroDestino}?text=${mensajeCodificado}`;
            window.open(urlWhatsapp, '_blank');
        } else if (metodo === 'correo') {
            const templateParams = {
                nombres: nombres,
                apellidos: apellidos,
                correo: correo,
                marca: marca
            };

            btnCorreoForm.innerText = "Enviando...";
            btnCorreoForm.disabled = true;

            emailjs.send('servicio_contacto_lam', 'template_ukfvgcy', templateParams)
                .then(function() {
                    alert("¡Mensaje enviado con éxito!");
                    if (modalContacto) modalContacto.close();
                    const form = document.getElementById('formulario-contacto');
                    if (form) form.reset();
                    btnCorreoForm.innerText = "Correo";
                    btnCorreoForm.disabled = false;
                }, function(error) {
                    alert("Hubo un error al enviar el correo. Por favor, intenta de nuevo.");
                    console.error("Error EmailJS:", error);
                    btnCorreoForm.innerText = "Correo";
                    btnCorreoForm.disabled = false;
                });
        }
    }
});