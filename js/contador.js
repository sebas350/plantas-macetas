let tiempoRestante = 1 * 1 * 1 * 60; // 3 días

function actualizarContador() {
  let dias = Math.floor(tiempoRestante / (60*60*24));
  let horas = Math.floor((tiempoRestante % (60*60*24)) / 3600);
  let min = Math.floor((tiempoRestante % 3600) / 60);
  let seg = tiempoRestante % 60;

  document.getElementById("dias").innerText = String(dias).padStart(2, "0");
  document.getElementById("horas").innerText = String(horas).padStart(2, "0");
  document.getElementById("min").innerText = String(min).padStart(2, "0");
  document.getElementById("seg").innerText = String(seg).padStart(2, "0");

  if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      ocultarOferta();
      return;
  }

  tiempoRestante--;
}

function ocultarOferta() {
  const oferta = document.querySelector(".oferta-container");
  if (oferta) {
    oferta.style.display = "none";
  }
}

actualizarContador();
const intervalo = setInterval(actualizarContador, 1000);