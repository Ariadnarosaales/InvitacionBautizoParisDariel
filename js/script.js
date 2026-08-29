const pantallaSobre = document.getElementById("pantalla-sobre");
const btnAbrirSello = document.getElementById("btnAbrirSello");
const invitacionContenido = document.getElementById("invitacion-contenido");
const botonesFlotantes = document.getElementById("botones-flotantes");

const btnPlayFlotante = document.getElementById("btnPlayFlotante");
const musica = document.getElementById("musica");

// IMÁGENES DEL CARRUSEL DE RECUERDOS (Usa tus archivos disponibles)
const imagenes = [
    "img/001.jpg",
    "img/002.jpg",
    "img/003.jpg",
    "img/005.jpg",
    "img/006.jpg",
    "img/007.jpg",
    "img/008.jpg",
    "img/009.jpg",
    "img/010.jpg",
    "img/012.jpg",
    "img/013.jpg",
    "img/015.jpg" 
];
let currentIndex = 0;

const sliderImg = document.getElementById("sliderImg");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");

// TRANSICIÓN AL PRESIONAR EL SELLO DE CERA
btnAbrirSello.addEventListener("click", function () {
    pantallaSobre.style.opacity = "0";

    setTimeout(() => {
        pantallaSobre.classList.add("oculto");
        invitacionContenido.classList.remove("oculto");
        botonesFlotantes.classList.remove("oculto");

        if (musica) {
            musica.play().catch(err => console.log("Audio bloqueado:", err));
        }

        AOS.init({
            duration: 1000,
            once: true,
            disable: false
        });
        AOS.refresh();

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 400);
});

// CONTROL DE MÚSICA FLOTANTE
btnPlayFlotante.addEventListener("click", function () {
    if (musica.paused) {
        musica.play();
        btnPlayFlotante.textContent = "🔊";
    } else {
        musica.pause();
        btnPlayFlotante.textContent = "🔇";
    }
});

// LÓGICA DEL CARRUSEL SLIDER
function updateSlider() {
    sliderImg.src = imagenes[currentIndex];
}

btnNext.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % imagenes.length;
    updateSlider();
});

btnPrev.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
    updateSlider();
});

// CUENTA REGRESIVA
const fechaEvento = new Date("Oct 10, 2026 14:00:00").getTime();

setInterval(function() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    if (diferencia > 0) {
        document.getElementById("days").innerText = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((diferencia % (1000 * 60)) / 1000);
    }
}, 1000);