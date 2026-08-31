// ==========================================
// PREGUNTAS
// ==========================================

const preguntas = [

    {
        pregunta: "Serie que vimos juntos?",
        respuesta: "Los100"
    },

    {
        pregunta: "Cual fue la primera pelicula que vimos?",
        respuesta: "YoAntesDeTi"
    },

    {
        pregunta: "cancion me recuerda a ti",
        respuesta: "Perfecta"
    },

    {
        pregunta: "Apodo cariñoso que te puse",
        respuesta: "SeñoritaHarly"
    },

    {
        pregunta: "Nombre del poema que te escribi",
        respuesta: "UnCorazonDeMiel"
    },

    {
        pregunta: "Que recuerdo crees que volveria a vivir con vos?",
        respuesta: "Todos"
    }

];


// ==========================================
// CONFIGURACIÓN
// ==========================================

const VIDAS_MAXIMAS = 3;

const TIEMPO_ESPERA =
    3 * 60 * 60 * 1000;


// ==========================================
// ESTADO
// ==========================================

let preguntaActual =
    Number(
        localStorage.getItem("preguntaActual")
    ) || 0;

let vidas =
    Number(
        localStorage.getItem("vidas")
    ) || VIDAS_MAXIMAS;

let bloqueoHasta =
    Number(
        localStorage.getItem("bloqueoHasta")
    ) || 0;

let recompensaPendiente =
    localStorage.getItem(
        "recompensaPendiente"
    ) || "";


// ==========================================
// ELEMENTOS
// ==========================================

const pantallas =
    document.querySelectorAll(".pantalla");

const pantallaInicio =
    document.getElementById("pantallaInicio");

const pantallaPregunta =
    document.getElementById("pantallaPregunta");

const pantallaEspera =
    document.getElementById("pantallaEspera");

const pantallaRegalo1 =
    document.getElementById("pantallaRegalo1");

const pantallaRegalo2 =
    document.getElementById("pantallaRegalo2");

const pantallaFinal =
    document.getElementById("pantallaFinal");

const pantallaCarta =
    document.getElementById("pantallaCarta");

const numeroPregunta =
    document.getElementById("numeroPregunta");

const numeroParte =
    document.getElementById("numeroParte");

const barraProgreso =
    document.getElementById("barraProgreso");

const textoPregunta =
    document.getElementById("textoPregunta");

const imagenPregunta =
    document.querySelector(".osoPregunta img");

const respuesta =
    document.getElementById("respuesta");

const vidasElemento =
    document.getElementById("vidas");

const mensajePregunta =
    document.getElementById("mensajePregunta");

const contador =
    document.getElementById("contador");


// ==========================================
// MOSTRAR PANTALLA
// ==========================================

function mostrarPantalla(pantalla) {

    pantallas.forEach(function(p) {

        p.classList.remove("activa");

    });

    pantalla.classList.add("activa");
}


// ==========================================
// NORMALIZAR RESPUESTAS
// ==========================================

function normalizar(texto) {

    return texto
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );
}


// ==========================================
// VIDAS
// ==========================================

function actualizarVidas() {

    let resultado = "";

    for (
        let i = 0;
        i < VIDAS_MAXIMAS;
        i++
    ) {

        if (i < vidas) {

            resultado += "❤️ ";

        } else {

            resultado += "🖤 ";

        }

    }

    vidasElemento.textContent =
        resultado;
}


// ==========================================
// PARTE ACTUAL
// ==========================================

function actualizarParte() {

    let parte;

    if (preguntaActual < 2) {

        parte = 1;

    } else if (preguntaActual < 4) {

        parte = 2;

    } else {

        parte = 3;

    }

    numeroParte.textContent = parte;
}


// ==========================================
// BARRA DE PROGRESO
// ==========================================

function actualizarProgreso() {

    const porcentaje =
        ((preguntaActual + 1) / 6) * 100;

    barraProgreso.style.width =
        porcentaje + "%";
}


// ==========================================
// CARGAR PREGUNTA
// ==========================================

function cargarPregunta() {

    if (
        preguntaActual >=
        preguntas.length
    ) {

        mostrarFinal();

        return;

    }

    numeroPregunta.textContent =
        "Pregunta " +
        (preguntaActual + 1) +
        "/6";

    textoPregunta.textContent =
        preguntas[preguntaActual].pregunta;

    respuesta.value = "";

    mensajePregunta.textContent = "";

    imagenPregunta.src =
    "imagenes/pregunta.png";

    actualizarVidas();

    actualizarParte();

    actualizarProgreso();

    setTimeout(function() {

        respuesta.focus();

    }, 200);

}


// ==========================================
// COMPROBAR BLOQUEO
// ==========================================

function bloqueoActivo() {

    return bloqueoHasta >
        Date.now();

}


// ==========================================
// CREAR BLOQUEO
// ==========================================

function crearBloqueo() {

    bloqueoHasta =
        Date.now() +
        TIEMPO_ESPERA;

    localStorage.setItem(
        "bloqueoHasta",
        bloqueoHasta
    );

}


// ==========================================
// RESPONDER
// ==========================================

function responder() {

    if (bloqueoActivo()) {

        mostrarEspera();

        return;

    }

    const respuestaUsuario =
        normalizar(
            respuesta.value
        );

    if (!respuestaUsuario) {

        mensajePregunta.textContent =
            "💕 Escribí una respuesta.";

        return;

    }

    const respuestaCorrecta =
        normalizar(
            preguntas[
                preguntaActual
            ].respuesta
        );


    // ======================================
    // CORRECTA
    // ======================================

    if (
        respuestaUsuario ===
        respuestaCorrecta
    ) {

        mensajePregunta.textContent =
            "💖 ¡Respuesta correcta! 💖";

            imagenPregunta.src =
    "imagenes/correcta.png";

        preguntaActual++;

        localStorage.setItem(
            "preguntaActual",
            preguntaActual
        );


        vidas =
            VIDAS_MAXIMAS;

        localStorage.setItem(
            "vidas",
            vidas
        );


        // ------------------------------
        // PREGUNTA 2
        // ------------------------------

        if (
            preguntaActual === 2
        ) {

            recompensaPendiente =
                "regalo1";

            localStorage.setItem(
                "recompensaPendiente",
                recompensaPendiente
            );

            setTimeout(function() {

                mostrarPantalla(
                    pantallaRegalo1
                );

            }, 900);

            return;
        }


        // ------------------------------
        // PREGUNTA 4
        // ------------------------------

        if (
            preguntaActual === 4
        ) {

            recompensaPendiente =
                "regalo2";

            localStorage.setItem(
                "recompensaPendiente",
                recompensaPendiente
            );

            setTimeout(function() {

                mostrarPantalla(
                    pantallaRegalo2
                );

            }, 900);

            return;
        }


        // ------------------------------
        // PREGUNTA 6
        // ------------------------------

        if (
            preguntaActual === 6
        ) {

            localStorage.removeItem(
                "recompensaPendiente"
            );

            setTimeout(function() {

                mostrarFinal();

            }, 1000);

            return;
        }


        // ------------------------------
        // PREGUNTAS NORMALES
        // ------------------------------

        crearBloqueo();

        setTimeout(function() {

            mostrarEspera();

        }, 900);

        return;

    }


    // ======================================
    // INCORRECTA
    // ======================================

    vidas--;

    localStorage.setItem(
        "vidas",
        vidas
    );

    actualizarVidas();

    imagenPregunta.src =
    "imagenes/incorrecta.png";
    
setTimeout(function() {

    imagenPregunta.src =
        "imagenes/pregunta.png";

}, 1500);

    if (
        vidas <= 0
    ) {

        mensajePregunta.textContent =
            "🥺 Se terminaron tus vidas...";

        crearBloqueo();

        setTimeout(function() {

            mostrarEspera();

        }, 900);

        return;

    }


    mensajePregunta.textContent =
        "❌ No es correcta. " +
        "Te quedan " +
        vidas +
        " vidas 💗";

}


// ==========================================
// CONTADOR
// ==========================================

let intervaloContador = null;

function mostrarEspera() {

    mostrarPantalla(
        pantallaEspera
    );

    actualizarContador();

}


function actualizarContador() {

    if (
        intervaloContador
    ) {

        clearInterval(
            intervaloContador
        );

    }

    intervaloContador =
        setInterval(function() {

            const restante =
                bloqueoHasta -
                Date.now();


            if (
                restante <= 0
            ) {

                clearInterval(
                    intervaloContador
                );

                bloqueoHasta = 0;

                localStorage.removeItem(
                    "bloqueoHasta"
                );

                cargarPregunta();

                mostrarPantalla(
                    pantallaPregunta
                );

                return;

            }


            const horas =
                Math.floor(
                    restante /
                    3600000
                );

            const minutos =
                Math.floor(
                    (restante %
                        3600000) /
                    60000
                );

            const segundos =
                Math.floor(
                    (restante %
                        60000) /
                    1000
                );


            contador.textContent =
                dosDigitos(horas) +
                ":" +
                dosDigitos(minutos) +
                ":" +
                dosDigitos(segundos);


        }, 250);

}


function dosDigitos(numero) {

    return String(numero)
        .padStart(2, "0");

}


// ==========================================
// FINAL
// ==========================================

function mostrarFinal() {

    mostrarPantalla(
        pantallaFinal
    );

}


// ==========================================
// BOTÓN COMENZAR
// ==========================================

document
    .getElementById("botonComenzar")
    .addEventListener(
        "click",
        function() {

            if (
                recompensaPendiente ===
                "regalo1"
            ) {

                mostrarPantalla(
                    pantallaRegalo1
                );

                return;

            }


            if (
                recompensaPendiente ===
                "regalo2"
            ) {

                mostrarPantalla(
                    pantallaRegalo2
                );

                return;

            }


            if (
                bloqueoActivo()
            ) {

                mostrarEspera();

                return;

            }


            cargarPregunta();

            mostrarPantalla(
                pantallaPregunta
            );

        }
    );


// ==========================================
// RESPONDER
// ==========================================

document
    .getElementById("botonResponder")
    .addEventListener(
        "click",
        responder
    );


respuesta.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            responder();

        }

    }
);


// ==========================================
// REGALO 1
// ==========================================

document
    .getElementById(
        "botonContinuarRegalo1"
    )
    .addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "recompensaPendiente"
            );

            crearBloqueo();

            mostrarEspera();

        }
    );


// ==========================================
// REGALO 2
// ==========================================

document
    .getElementById(
        "botonContinuarRegalo2"
    )
    .addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "recompensaPendiente"
            );

            crearBloqueo();

            mostrarEspera();

        }
    );


// ==========================================
// CORAZÓN FINAL
// ==========================================

document
    .getElementById(
        "corazonFinal"
    )
    .addEventListener(
        "click",
        function() {

            const corazon =
                document.getElementById(
                    "corazonFinal"
                );

            corazon.classList.add(
                "corazonAbierto"
            );

            setTimeout(function() {

                corazon.classList.remove(
                    "corazonAbierto"
                );

                mostrarPantalla(
                    pantallaCarta
                );

            }, 1000);

        }
    );


// ==========================================
// INICIAR
// ==========================================

function iniciarJuego() {

    if (
        preguntaActual >= 6
    ) {

        mostrarFinal();

        return;

    }


    if (
        recompensaPendiente ===
        "regalo1"
    ) {

        mostrarPantalla(
            pantallaRegalo1
        );

        return;

    }


    if (
        recompensaPendiente ===
        "regalo2"
    ) {

        mostrarPantalla(
            pantallaRegalo2
        );

        return;

    }


    if (
        bloqueoActivo()
    ) {

        mostrarEspera();

        return;

    }


    mostrarPantalla(
        pantallaInicio
    );

}


iniciarJuego();