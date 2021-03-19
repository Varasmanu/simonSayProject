let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;

const botonEmpezar = document.querySelector("#botonEmpezar");
botonEmpezar.addEventListener("click", (e) => {
  e.preventDefault();
  comenzarJuego();
});

function comenzarJuego() {
  actualizarEstado("Turno de la máquina");

  const retrasoJugador = (secuenciaMaquina.length + 1) * 1000;
  const $nuevoCuadro = obtenerCuadroAleatorio();
  secuenciaMaquina.push($nuevoCuadro);

  secuenciaMaquina.forEach(function ($cuadro, index) {
    const retraso = (index + 1) * 1000;
    setTimeout(() => {
      resaltar($cuadro);
      console.log(index);
    }, retraso);
  });

  setTimeout(() => {
    actualizarEstado("Turno del jugador");
  }, retrasoJugador);
}

function actualizarEstado(nuevoEstado) {
  const $estado = document.querySelector("#estado");
  $estado.textContent = nuevoEstado;
}

function obtenerCuadroAleatorio() {
  const $cuadros = document.querySelectorAll(".cuadro");
  const indexCuadros = Math.floor(Math.random() * $cuadros.length);
  return $cuadros[indexCuadros];
}

function resaltar($cuadro) {
  $cuadro.style.opacity = 1;
  setTimeout(() => {
    $cuadro.style.opacity = 0.5;
  }, 500);
}
