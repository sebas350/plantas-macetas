document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formRegistro");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Limpiar errores anteriores
    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorEmail").textContent = "";
    document.getElementById("errorTelefono").textContent = "";
    document.getElementById("errorPassword").textContent = "";
    document.getElementById("errorRepetir").textContent = "";

    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const password = document.getElementById("password").value;
    const repetirPassword = document.getElementById("repetirPassword").value;

    let valid = true;

    // Validaciones
    if (!nombre) {
      document.getElementById("errorNombre").textContent = "El nombre es obligatorio.";
      valid = false;
    }

    if (!email) {
      document.getElementById("errorEmail").textContent = "El email es obligatorio.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("errorEmail").textContent = "Email no válido.";
      valid = false;
    }

    if (!telefono) {
      document.getElementById("errorTelefono").textContent = "El teléfono es obligatorio.";
      valid = false;
    } else if (!/^\d{7,15}$/.test(telefono)) {
      document.getElementById("errorTelefono").textContent = "Teléfono no válido.";
      valid = false;
    }

    if (!password) {
      document.getElementById("errorPassword").textContent = "La contraseña es obligatoria.";
      valid = false;
    } else if (password.length < 6) {
      document.getElementById("errorPassword").textContent = "La contraseña debe tener al menos 6 caracteres.";
      valid = false;
    }

    if (!repetirPassword) {
      document.getElementById("errorRepetir").textContent = "Debes repetir la contraseña.";
      valid = false;
    } else if (password !== repetirPassword) {
      document.getElementById("errorRepetir").textContent = "Las contraseñas no coinciden.";
      valid = false;
    }

    if (!valid) return;

    // Guardar usuario en localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.find(u => u.email === email)) {
      document.getElementById("errorEmail").textContent = "Este email ya está registrado.";
      return;
    }

    usuarios.push({ nombre, email, telefono, password });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Redirigir a login
    window.location.href = "login.html";
  });
});