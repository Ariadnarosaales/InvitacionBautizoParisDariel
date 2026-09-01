const pantallaSobre = document.getElementById("pantalla-sobre");
const btnAbrirSello = document.getElementById("btnAbrirSello");
const invitacionContenido = document.getElementById("invitacion-contenido");
const botonesFlotantes = document.getElementById("botones-flotantes");
const btnPlayFlotante = document.getElementById("btnPlayFlotante");
const musica = document.getElementById("musica");

// ==========================================
// IMÁGENES DEL CARRUSEL DE RECUERDOS
// ==========================================

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

/// ==========================================
// TRANSICIÓN AL PRESIONAR EL SOBRE
// ==========================================

if (btnAbrirSello) {

    btnAbrirSello.addEventListener("click", function () {

        if (pantallaSobre) {
            pantallaSobre.style.opacity = "0";
        }

        setTimeout(() => {

            if (pantallaSobre) {
                pantallaSobre.classList.add("oculto");
            }

            if (invitacionContenido) {
                invitacionContenido.classList.remove("oculto");
            }

            if (botonesFlotantes) {
                botonesFlotantes.classList.remove("oculto");
            }

            // CAMBIO DINÁMICO DE FONDO
            document.body.classList.add("fondo-abierto");

            // REPRODUCIR MÚSICA
            if (musica) {
                musica.play().catch(err => {
                    console.log("Audio bloqueado:", err);
                });
            }

            // INICIAR AOS DESPUÉS DE MOSTRAR EL CONTENIDO
            if (typeof AOS !== "undefined") {
                AOS.init({
                    duration: 1000,
                    once: true,
                    disable: false
                });

                setTimeout(() => {
                    AOS.refreshHard();
                }, 100);
            }

            // VOLVER AL INICIO SIN ANIMACIÓN
            window.scrollTo(0, 0);

        }, 400);
    });
}

// ==========================================
// CONTROL DE MÚSICA FLOTANTE
// ==========================================

if (btnPlayFlotante) {
    btnPlayFlotante.addEventListener("click", function () {

        if (!musica) return;

        if (musica.paused) {

            musica.play().then(() => {
                btnPlayFlotante.textContent = "🔊";
            }).catch(err => {
                console.log("No se pudo reproducir la música:", err);
            });

        } else {

            musica.pause();
            btnPlayFlotante.textContent = "🔇";
        }
    });
}

// ==========================================
// LÓGICA DEL CARRUSEL
// ==========================================

function updateSlider() {

    if (!sliderImg) return;

    sliderImg.src = imagenes[currentIndex];

    sliderImg.onerror = function () {
        console.error(
            "No se pudo cargar la imagen:",
            imagenes[currentIndex]
        );
    };
}

if (btnNext) {
    btnNext.addEventListener("click", function () {

        currentIndex = (currentIndex + 1) % imagenes.length;

        updateSlider();
    });
}

if (btnPrev) {
    btnPrev.addEventListener("click", function () {

        currentIndex =
            (currentIndex - 1 + imagenes.length) % imagenes.length;

        updateSlider();
    });
}

// ==========================================
// CUENTA REGRESIVA
// ==========================================

const fechaEvento = new Date("October 10, 2026 14:00:00").getTime();

function actualizarCuentaRegresiva() {

    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if (!days || !hours || !minutes || !seconds) return;

    if (diferencia > 0) {

        const dias = Math.floor(
            diferencia / (1000 * 60 * 60 * 24)
        );

        const horas = Math.floor(
            (diferencia % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutos = Math.floor(
            (diferencia % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const segundos = Math.floor(
            (diferencia % (1000 * 60)) /
            1000
        );

        days.innerText = String(dias).padStart(2, "0");
        hours.innerText = String(horas).padStart(2, "0");
        minutes.innerText = String(minutos).padStart(2, "0");
        seconds.innerText = String(segundos).padStart(2, "0");

    } else {

        days.innerText = "00";
        hours.innerText = "00";
        minutes.innerText = "00";
        seconds.innerText = "00";
    }
}

// EJECUCIÓN INICIAL
actualizarCuentaRegresiva();

setInterval(actualizarCuentaRegresiva, 1000);