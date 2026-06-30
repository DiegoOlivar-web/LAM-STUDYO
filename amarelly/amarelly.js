// ==========================================
// 1. DESPLAZAMIENTO SUAVE DEL NAVBAR
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Evita errores si el href solo es "#" o si es una clase que no existe
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// 3. CONTROL DE MODALES (Portadas y Reels)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const openButtons = document.querySelectorAll(".open-modal-btn");
    const closeButtons = document.querySelectorAll(".close-modal-btn");
    const modals = document.querySelectorAll(".modal-container");

    // Función general para cerrar el modal
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove("active");
            document.body.style.overflow = ""; // Restaura el scroll del fondo de la página
        }
    }

    // Abrir Modal
    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const modal = document.getElementById(targetId);
            
            if (modal) {
                modal.classList.add("active");
                document.body.style.overflow = "hidden"; // Bloquea el scroll de la página de fondo
            }
        });
    });

    // Cerrar desde el botón 'X'
    closeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const modal = e.target.closest(".modal-container");
            closeModal(modal);
        });
    });

    // Cerrar haciendo click en el fondo oscuro exterior
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
});