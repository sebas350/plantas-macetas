const hero = document.getElementById("hero");

const imagenes = [
  "img/portada.jpg",

  "img/planta1.jpg",
  "img/planta2.jpg",
  "img/planta3.jpg",
  "img/planta4.jpg",
  "img/planta5.jpg",

  "img/maceta1.jpg",
  "img/maceta2.jpg",
  "img/maceta3.jpg",
  "img/maceta4.jpg",
  "img/maceta5.jpg"
];

let indice = 0;

function actualizarHero() {
    hero.style.backgroundImage = `url('${imagenes[indice]}')`;
}

actualizarHero();

document.getElementById("next").onclick = () => {
    indice = (indice + 1) % imagenes.length;
    actualizarHero();
};

document.getElementById("prev").onclick = () => {
    indice = (indice - 1 + imagenes.length) % imagenes.length;
    actualizarHero();
};

setInterval(() => {
    indice = (indice + 1) % imagenes.length;
    actualizarHero();
}, 5000);
