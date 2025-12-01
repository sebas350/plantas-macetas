const btnCargar = document.getElementById("btnCargar");
const ocultos = document.querySelectorAll(".producto.hidden");

btnCargar.addEventListener("click", () => {
    ocultos.forEach(p => p.classList.remove("hidden"));
    btnCargar.style.display = "none";
});