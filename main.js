let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;

const botonEmpezar = document.querySelector("#botonEmpezar");
botonEmpezar.addEventListener("click", (e) => {
  e.preventDefault();
  comenzarJuego();
});

bloquearInputUsuario();

function comenzarJuego() {
  reiniciarEstado();
  manejarRonda();
}

function reiniciarEstado() {
  secuenciaMaquina = [];
  secuenciaUsuario = [];
  ronda = 0;
}

function manejarRonda() {
  actualizarEstado("Turno de la máquina");
  bloquearInputUsuario();

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
    desbloquearInputUsuario();
  }, retrasoJugador);

  secuenciaUsuario = [];
  ronda++;
  actualizarEstadoRonda(ronda);
}

function actualizarEstado(nuevoEstado, error = false) {
  const $estado = document.querySelector("#estado");
  $estado.textContent = nuevoEstado;

  if (error) {
    $estado.classList.remove("alert-primary");
    $estado.classList.add("alert-danger");
  } else {
    $estado.classList.remove("alert-danger");
    $estado.classList.add("alert-primary");
  }
}

function actualizarEstadoRonda(nuevoEstado) {
  const $estado = document.querySelector("#ronda");
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

function bloquearInputUsuario() {
  const $cuadros = document.querySelectorAll(".cuadro");
  $cuadros.forEach(function ($cuadro) {
    $cuadro.onclick = function () {
      console.log("se bloqueo");
    };
  });
}

function desbloquearInputUsuario() {
  const $cuadros = document.querySelectorAll(".cuadro");
  $cuadros.forEach(function ($cuadro) {
    $cuadro.onclick = manejarInputUsario;
  });
}

function manejarInputUsario(e) {
  console.log(e);
  const $cuadro = e.target;
  resaltar($cuadro);
  secuenciaUsuario.push($cuadro);

  const cuadrosUsuarios = secuenciaMaquina[secuenciaUsuario.length - 1];
  if ($cuadro.id !== cuadrosUsuarios.id) {
    perdiste();
  } else if (secuenciaUsuario.length === secuenciaMaquina.length) {
    setTimeout(() => {
      manejarRonda();
    }, 1000);
  }
}

function perdiste() {
  actualizarEstado("Perdiste! Toca `empezar` para jugar de nuevo!", true);
  bloquearInputUsuario();
  actualizarEstadoRonda("0");
}
