const btnMenu = document.getElementById("btnMenu");
const nav = document.getElementById("nav");

btnMenu.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
});

document.addEventListener("DOMContentLoaded", () => {
    const logoutLink = document.querySelector(".logout-link");
    const loginLink = nav.querySelector('a[href="login.html"]');

    if (!logoutLink) return; // Si no hay logoutLink, salimos

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    let mensajeBienvenida = document.createElement("span");
    mensajeBienvenida.classList.add("ms-3", "text-light", "fw-bold");

    if (usuarioLogueado) {
        mensajeBienvenida.textContent = `Hola, ${usuarioLogueado.nombre}!`;
        nav.insertBefore(mensajeBienvenida, logoutLink);
        logoutLink.style.display = "inline-block";
        if (loginLink) loginLink.style.display = "none";
    } else {
        logoutLink.style.display = "none";
    }

    logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("usuarioLogueado");
        location.reload();
    });
});