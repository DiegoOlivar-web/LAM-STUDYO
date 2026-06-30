// Hamburguesa
const menuToggle = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    // Cambiar icono entre barras y X
    const icon = menuToggle.querySelector('i');
    if (navbar.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// --- FUNCIONALIDAD DE VIDEO DE REELS ---
const reels = document.querySelectorAll('.reel-item');

reels.forEach(reel => {
    const video = reel.querySelector('.video-reel');
    const btnPlay = reel.querySelector('.play-btn');

    btnPlay.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            btnPlay.classList.add('hidden');
        } else {
            video.pause();
            btnPlay.classList.remove('hidden');
        }
    });

    // Opcional: Pausar si el usuario hace clic en el video
    video.addEventListener('click', () => {
        video.pause();
        btnPlay.classList.remove('hidden');
    });
});

// --- MODAL DE CONTACTO Y ENVÍO DE DATOS ---
document.addEventListener("DOMContentLoaded", function() {
    const modalContacto = document.getElementById('modal-contacto');
    const botonesAbrir = document.querySelectorAll('.trigger-modal');
    const btnCerrarContacto = document.getElementById('btn-cerrar-contacto');
    const btnWhatsappForm = document.getElementById('btn-whatsapp');
    const btnCorreoForm = document.getElementById('btn-correo');

    // Lógica para abrir el modal (se aplica a todos los botones encontrados)
    if (botonesAbrir.length > 0 && modalContacto) {
        botonesAbrir.forEach(btn => {
            btn.addEventListener('click', () => {
                modalContacto.showModal();
            });
        });
    }

    // Lógica para cerrar con el botón X
    if (btnCerrarContacto && modalContacto) {
        btnCerrarContacto.addEventListener('click', () => {
            modalContacto.close();
        });

        // Cerrar el modal haciendo clic fuera de la caja
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

    // Lógica de los botones de envío
    if (btnWhatsappForm && btnCorreoForm) {
        btnWhatsappForm.addEventListener('click', function() {
            procesarFormulario('whatsapp');
        });

        btnCorreoForm.addEventListener('click', function() {
            procesarFormulario('correo');
        });
    }

    function procesarFormulario(metodo) {
        const nombres = document.getElementById('nombres').value.trim();
        const apellidos = document.getElementById('apellidos').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const marca = document.getElementById('marca').value.trim();

        if (!nombres || !apellidos || !marca) {
            alert("Por favor, completa todos los campos para continuar.");
            return;
        }

        const mensajeTexto = `Hola, *LAM STUDYO*. Me llamo *${nombres} ${apellidos}* (*${correo}*) y deseo reservar una sesión.\n*Consulta:* ${marca}`;

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

            // Usamos el botón de correo para indicar que está procesando
            btnCorreoForm.innerText = "Enviando...";
            btnCorreoForm.disabled = true;

            emailjs.send('servicio_contacto_lam', 'template_ukfvgcy', templateParams)
                .then(function(response) {
                    alert("¡Mensaje enviado con éxito!");
                    // Mover estas líneas aquí adentro para que ocurran tras el éxito
                    modalContacto.close();
                    document.getElementById('formulario-contacto').reset();
                    btnCorreoForm.innerText = "Enviar correo";
                    btnCorreoForm.disabled = false;
                }, function(error) {
                    alert("Hubo un error al enviar el correo. Por favor, intenta de nuevo.");
                    console.error("Error:", error);
                    btnCorreoForm.innerText = "Enviar correo";
                    btnCorreoForm.disabled = false;
                });
        }
    }
});