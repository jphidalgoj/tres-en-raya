function iniciarJuego(){
    let contenedorPrincipal=document.querySelector("#contenedor-juego");
    contenedorPrincipal.style.display="none";
    let botonJuego=document.querySelector("#btn-jugar");
    botonJuego.addEventListener("click", mostrarTabla);
}
function mostrarTabla() {
    let contenedorPrincipal = document.querySelector("#contenedor-juego");
    contenedorPrincipal.style.display = "flex";
    let resultado = document.querySelector("#resultado");
    let jugadorActual = 'X'; // Jugador actual (empieza X)

    // Matriz para mantener el estado del juego
    let juego = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // Función para verificar si hay un ganador
    function hayGanador() {
        // Comprobar filas
        for (let i = 0; i < 3; i++) {
            if (juego[i][0] !== '' && juego[i][0] === juego[i][1] && juego[i][1] === juego[i][2]) {
                return juego[i][0]; // Devuelve el jugador que ganó
            }
        }

        // Comprobar columnas
        for (let j = 0; j < 3; j++) {
            if (juego[0][j] !== '' && juego[0][j] === juego[1][j] && juego[1][j] === juego[2][j]) {
                return juego[0][j]; // Devuelve el jugador que ganó
            }
        }

        // Comprobar diagonales
        if (juego[0][0] !== '' && juego[0][0] === juego[1][1] && juego[1][1] === juego[2][2]) {
            return juego[0][0]; // Diagonal principal
        }
        if (juego[0][2] !== '' && juego[0][2] === juego[1][1] && juego[1][1] === juego[2][0]) {
            return juego[0][2]; // Diagonal secundaria
        }

        // Si no hay ganador pero el tablero está lleno, es empate
        let tableroLleno = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (juego[i][j] === '') {
                    tableroLleno = false;
                    break;
                }
            }
        }
        if (tableroLleno) {
            return 'Empate';
        }

        return null; // No hay ganador todavía
    }

    // Función para manejar el clic en un botón
    function manejarClic(boton, fila, columna) {
        if (juego[fila][columna] === '') {
            juego[fila][columna] = jugadorActual;
            boton.textContent = jugadorActual;
            boton.disabled = true;

            let ganador = hayGanador();
            if (ganador !== null) {
                if (ganador === 'Empate') {
                    resultado.textContent = '¡Hubo un empate!';
                } else {
                    resultado.textContent = `¡El jugador ${ganador} ha ganado!`;
                }
                // Deshabilitar todos los botones
                let botones = document.querySelectorAll(".botones");
                botones.forEach(boton => {
                    boton.disabled = true;
                });
            } else {
                // Alternar jugador
                jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
            }
        }
    }

    // Crear y configurar los botones
    for (let i = 0; i < 3; i++) {
        let contenedorDiv = document.createElement("div");
        contenedorDiv.classList.add('contenedor');
        for (let j = 0; j < 3; j++) {
            let nuevoBoton = document.createElement("button");
            nuevoBoton.classList.add("botones");
            nuevoBoton.textContent = '';
            nuevoBoton.addEventListener("click", function() {
                manejarClic(nuevoBoton, i, j);
            });
            contenedorDiv.appendChild(nuevoBoton);
        }
        contenedorPrincipal.appendChild(contenedorDiv);
    }
}


/*function mostrarTabla(){
    let contenedorPrincipal=document.querySelector("#contenedor-juego");
    contenedorPrincipal.style.display="flex";
    let resultado = document.querySelector("#resultado");
    
   


    for (let i=0; i<3;i++){
        let contenedorDiv=document.createElement("div");
        contenedorDiv.classList.add('contenedor');
        for(let j=0; j<3;j++){
           let nuevoBoton = document.createElement("button");
           nuevoBoton.classList.add("botones");
           nuevoBoton.id=`${i * 3 + j + 1}`
           nuevoBoton.textContent = `${i * 3 + j + 1}`;
           

           nuevoBoton.addEventListener("click", function(){
            if(nuevoBoton.textContent===`${i * 3 + j + 1}`){
                nuevoBoton.textContent="x";
                nuevoBoton.disabled=true;
               
            } 
            
           })

           contenedorDiv.appendChild(nuevoBoton);
        }
        contenedorPrincipal.appendChild(contenedorDiv); 
    }

}
*/
window.addEventListener("load", iniciarJuego);
