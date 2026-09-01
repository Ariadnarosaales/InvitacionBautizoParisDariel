const pantallaSobre = document.getElementById("pantalla-sobre");
const btnAbrirSello = document.getElementById("btnAbrirSello");
const invitacionContenido = document.getElementById("invitacion-contenido");
const botonesFlotantes = document.getElementById("botones-flotantes");

const btnPlayFlotante = document.getElementById("btnPlayFlotante");
const musica = document.getElementById("musica");

// IMÁGENES DEL CARRUSEL DE RECUERDOS
const imagenes = [
    "../img/001.jpg",
    "../img/002.jpg",
    "../img/003.jpg",
    "../img/005.jpg",
    "../img/006.jpg",
    "../img/007.jpg",
    "../img/008.jpg",
    "../img/009.jpg",
    "../img/010.jpg",
    "../img/012.jpg",
    "../img/013.jpg",
    "../img/015.jpg"
];
let currentIndex = 0;

const sliderImg = document.getElementById("sliderImg");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");

// TRANSICIÓN AL PRESIONAR EL SOBRE
btnAbrirSello.addEventListener("click", function () {
    pantallaSobre.style.opacity = "0";

    setTimeout(() => {
        pantallaSobre.classList.add("oculto");
        invitacionContenido.classList.remove("oculto");
        botonesFlotantes.classList.remove("oculto");

        // CAMBIO DINÁMICO DE FONDO A FONDO2.JPG
        document.body.classList.add("fondo-abierto");

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

// CUENTA REGRESIVA EN TIEMPO REAL
const fechaEvento = new Date("Oct 10, 2026 14:00:00").getTime();

function actualizarCuentaRegresiva() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    if (diferencia > 0) {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(dias).padStart(2, '0');
        document.getElementById("hours").innerText = String(horas).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutos).padStart(2, '0');
        document.getElementById("seconds").innerText = String(segundos).padStart(2, '0');
    } else {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
    }
}

// Ejecución inicial rápida
actualizarCuentaRegresiva();
setInterval(actualizarCuentaRegresiva, 1000);