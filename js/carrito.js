
  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }

  function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }


function agregarAlCarrito(productoNuevo) {
  let carrito = obtenerCarrito();

  const existente = carrito.find(p => p.id === productoNuevo.id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({
      id: productoNuevo.id,
      nombre: productoNuevo.nombre,
      precio: productoNuevo.precio,
      precioOriginal: productoNuevo.precioOriginal || null,
      imagen: productoNuevo.imagen,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  alert("Producto agregado al carrito");
}


  const COSTO_ENVIO = 4500;

function renderCarrito() {
    const contenedor = document.getElementById("carrito-contenedor");
    const subtotalHtml = document.getElementById("total-carrito");
    const envioHtml = document.getElementById("envio-carrito");
    const totalFinalHtml = document.getElementById("total-final");

    let carrito = obtenerCarrito();

    if (!contenedor) return; // seguridad

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        subtotalHtml.textContent = "$0";
        envioHtml.textContent = "$0";
        totalFinalHtml.textContent = "$0";
        return;
    }

    contenedor.innerHTML = "";
    let subtotal = 0;

    carrito.forEach(producto => {
        subtotal += producto.precio * producto.cantidad;

        const item = document.createElement("div");
        item.classList.add("carrito-item");

        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="flex-grow-1">
                <h5>${producto.nombre}</h5>
                <p>Precio: $${producto.precio}</p>

                <div class="d-flex align-items-center gap-2">
                    <button class="btn-cantidad" onclick="restar(${producto.id})">-</button>
                    <span>${producto.cantidad}</span>
                    <button class="btn-cantidad" onclick="sumar(${producto.id})">+</button>
                </div>
            </div>

            <button class="btn-eliminar" onclick="eliminar(${producto.id})">Eliminar</button>
        `;

        contenedor.appendChild(item);
    });

    const totalFinal = subtotal + COSTO_ENVIO;

    subtotalHtml.textContent = "$" + subtotal;
    envioHtml.textContent = "$" + COSTO_ENVIO;
    totalFinalHtml.textContent = "$" + totalFinal;
}

  
  
  
  function sumar(id) {
    let carrito = obtenerCarrito();
    let producto = carrito.find(p => p.id === id);
    producto.cantidad++;
    guardarCarrito(carrito);
    renderCarrito();
  }

  function restar(id) {
    let carrito = obtenerCarrito();
    let producto = carrito.find(p => p.id === id);

    if (producto.cantidad > 1) producto.cantidad--;
    else carrito = carrito.filter(p => p.id !== id);

    guardarCarrito(carrito);
    renderCarrito();
  }

  function eliminar(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito(carrito);
    renderCarrito();
  }

  renderCarrito();
  
  
  function procesarPago() {
    let carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (!usuarioLogueado) {
        // Guardamos la URL actual para volver después
        localStorage.setItem("urlPrevioPago", window.location.href);
        alert("Debes registrarte o iniciar sesión para continuar con el pago.");
        window.location.href = "login.html"; // redirige al login
        return;
    }

    // Usuario logueado: continuar con el pago
    alert(`¡Gracias por tu compra, ${usuarioLogueado.nombre}! Nos contactaremos contigo para coordinar el envío.`);

    localStorage.removeItem("carrito"); // vaciar carrito
    renderCarrito(); // actualizar vista
}

document.addEventListener("DOMContentLoaded", () => {
    const btnPagar = document.getElementById("btnPagar");
    if (btnPagar) {
        btnPagar.addEventListener("click", procesarPago);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const btnPagar = document.getElementById("btnPagar");
    if (btnPagar) {
        btnPagar.addEventListener("click", procesarPago);
    }
});
  
  
