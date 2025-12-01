document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    let valid = true;

    document.getElementById("errorEmail").textContent = "";
    document.getElementById("errorPassword").textContent = "";

    if (!email) {
      document.getElementById("errorEmail").textContent = "El email es obligatorio.";
      valid = false;
    }

    if (!password) {
      document.getElementById("errorPassword").textContent = "La contraseña es obligatoria.";
      valid = false;
    }

    if (!valid) return;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
      document.getElementById("errorEmail").textContent = "El email no está registrado.";
      return;
    }

    if (usuario.password !== password) {
      document.getElementById("errorPassword").textContent = "Contraseña incorrecta.";
      return;
    }

    alert("¡Gracias por iniciar sesión! Bienvenido/a " + usuario.nombre);
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
    const redirigir = localStorage.getItem("redirigirLuegoLogin");
if (redirigir) {
    localStorage.removeItem("redirigirLuegoLogin");
    window.location.href = "carrito.html"; // va al carrito o checkout
} else {
    window.location.href = "index.html";
}
  });
});
