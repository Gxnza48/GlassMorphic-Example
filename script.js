gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Animación de entrada para el encabezado
gsap.from("header", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power3.out"
});

// Animación para las tarjetas de características e información
gsap.from(".card", {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#caracteristicas",
        start: "top 80%"
    }
});

// Animación para los iconos
gsap.from(".card i", {
    scale: 0,
    rotation: 360,
    duration: 1,
    ease: "elastic.out(1, 0.3)",
    scrollTrigger: {
        trigger: "#caracteristicas",
        start: "top 80%"
    }
});

// Animación suave para el desplazamiento de los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        gsap.to(window, {duration: 1, scrollTo: target, ease: "power2.inOut"});
    });
});

// Manejo del menú hamburguesa
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links li").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
}));

// Botón de scroll hacia arriba con animación suave
const scrollToTopButton = document.getElementById('scroll-to-top');

// Función para mostrar u ocultar el botón de scroll
function toggleScrollToTopButton() {
    if (window.pageYOffset > 300) {
        if (!scrollToTopButton.classList.contains('show')) {
            scrollToTopButton.classList.add('show');
            gsap.to(scrollToTopButton, {duration: 0.5, opacity: 1, scale: 1});
        }
    } else {
        if (scrollToTopButton.classList.contains('show')) {
            scrollToTopButton.classList.remove('show');
            gsap.to(scrollToTopButton, {duration: 0.5, opacity: 0, scale: 0.5});
        }
    }
}

// Añadir el evento scroll al window
window.addEventListener('scroll', toggleScrollToTopButton);

// Asegurarse de que el botón esté oculto al cargar la página
toggleScrollToTopButton();

scrollToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    gsap.to(window, {duration: 1.5, scrollTo: 0, ease: "power4.inOut"});
});