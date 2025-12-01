const modal = document.getElementById("modal");
const backdrop = document.getElementById("backdrop");
const cerrarModal = document.getElementById("cerrarModal");

// Crear input y span de error dentro del modal si no existen
let inputEmail = modal.querySelector("input[type='email']");
if (!inputEmail) {
    inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.placeholder = "Ingresa tu correo";
    inputEmail.classList.add("form-control", "mb-2");
    modal.insertBefore(inputEmail, modal.querySelector(".btn-success"));
}

let errorMsg = modal.querySelector(".error-msg");
if (!errorMsg) {
    errorMsg = document.createElement("span");
    errorMsg.classList.add("text-danger", "small", "d-block", "mb-2");
    modal.insertBefore(errorMsg, modal.querySelector(".btn-success"));
}

// Mostrar modal automáticamente después de 5 segundos
setTimeout(() => {
    modal.classList.add("visible");
    backdrop.classList.add("visible");
}, 5000);

// Botón Suscribirme
modal.querySelector(".btn-success").addEventListener("click", () => {
    const email = inputEmail.value.trim();
    errorMsg.textContent = "";

    if (!email) {
        errorMsg.textContent = "El correo es obligatorio.";
        return;
    }

    // Validación simple de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMsg.textContent = "Ingresa un correo válido.";
        return;
    }

    // Guardar en localStorage simulando suscripción
    let suscripciones = JSON.parse(localStorage.getItem("suscripciones")) || [];
    if (!suscripciones.includes(email)) {
        suscripciones.push(email);
        localStorage.setItem("suscripciones", JSON.stringify(suscripciones));
    }

    alert("¡Gracias por suscribirte! Pronto recibirás nuestras ofertas.");
    inputEmail.value = "";
    modal.classList.remove("visible");
    backdrop.classList.remove("visible");
});

// Cerrar modal
cerrarModal.addEventListener("click", () => {
    modal.classList.remove("visible");
    backdrop.classList.remove("visible");
});