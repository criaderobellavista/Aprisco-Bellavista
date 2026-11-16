// ==========================================
// BELLAVISTA - CRIADERO DORPER
// JAVASCRIPT PRINCIPAL
// ==========================================

// CONFIGURACIÓN DEL CRIADERO

const CONFIG = {
  nombre: "Bellavista",
  whatsapp: "", // Agregar número con indicativo 57
  instagram: "",
  facebook: "",
  correo: ""
};

// ==========================================
// MENÚ DE NAVEGACIÓN
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const abierto = navMenu.classList.toggle("active");

    menuToggle.setAttribute(
      "aria-expanded",
      String(abierto)
    );

    menuToggle.textContent = abierto ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach(enlace => {
    enlace.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  document.addEventListener("keydown", evento => {
    if (evento.key === "Escape") {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });
}

// ==========================================
// CATÁLOGO DE ANIMALES
// ==========================================

// Aquí agregaremos los animales reales.
// No incluimos nombres ni genealogías inventadas.

const animales = [
  // EJEMPLO DE CÓMO AGREGAR UN ANIMAL:
  //
  // {
  //   id: "BV-001",
  //   nombre: "Nombre del animal",
  //   raza: "Dorper",
  //   sexo: "macho",
  //   edad: "8 meses",
  //   imagen: "assets/animal-001.jpg",
  //   disponible: true
  // }
];

const animalGrid = document.getElementById("animalGrid");

function crearTarjetaAnimal(animal) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "animal-card";

  const imagen = document.createElement("img");
  imagen.src = animal.imagen || "assets/animal-default.jpg";
  imagen.alt = animal.nombre || "Animal Bellavista";
  imagen.loading = "lazy";

  const contenido = document.createElement("div");
  contenido.className = "animal-card-content";

  const titulo = document.createElement("h3");
  titulo.textContent = animal.nombre || animal.id;

  const detalles = document.createElement("p");
  detalles.textContent =
    `${animal.raza} · ${animal.sexo} · ${animal.edad}`;

  const identificacion = document.createElement("p");
  identificacion.textContent = `Identificación: ${animal.id}`;

  const estado = document.createElement("p");
  estado.textContent = animal.disponible
    ? "Disponible"
    : "No disponible";

  const consulta = document.createElement("a");
  consulta.textContent = "Consultar precio →";

  if (CONFIG.whatsapp && animal.disponible) {
    const mensaje =
      `Hola, quisiera información sobre el animal ${animal.id} de Bellavista.`;

    consulta.href =
      `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;

    consulta.target = "_blank";
    consulta.rel = "noopener noreferrer";
  } else {
    consulta.removeAttribute("href");
    consulta.style.opacity = "0.5";
    consulta.style.cursor = "default";
    consulta.title = "Consulta no disponible";
  }

  contenido.append(
    titulo,
    detalles,
    identificacion,
    estado,
    consulta
  );

  tarjeta.append(imagen, contenido);

  return tarjeta;
}

// ==========================================
// MOSTRAR Y FILTRAR ANIMALES
// ==========================================

function mostrarAnimales(filtro = "todos") {
  if (!animalGrid) return;

  animalGrid.replaceChildren();

  const filtrados = animales.filter(animal => {
    return filtro === "todos" || animal.sexo === filtro;
  });

  if (filtrados.length === 0) {
    const mensaje = document.createElement("p");

    mensaje.textContent = animales.length === 0
      ? "El catálogo de ejemplares se está preparando."
      : "No hay ejemplares en esta categoría.";

    mensaje.style.gridColumn = "1 / -1";
    mensaje.style.textAlign = "center";
    mensaje.style.padding = "45px 20px";

    animalGrid.appendChild(mensaje);
    return;
  }

  filtrados.forEach(animal => {
    animalGrid.appendChild(crearTarjetaAnimal(animal));
  });
}

const botonesFiltro =
  document.querySelectorAll(".filter-btn");

botonesFiltro.forEach(boton => {
  boton.addEventListener("click", () => {
    botonesFiltro.forEach(b => {
      b.classList.remove("active");
    });

    boton.classList.add("active");

    mostrarAnimales(boton.dataset.filter);
  });
});

mostrarAnimales();

// ==========================================
// WHATSAPP
// ==========================================

const whatsappLink =
  document.getElementById("whatsappLink");

if (whatsappLink) {
  if (CONFIG.whatsapp) {
    const mensaje =
      "Hola, quisiera recibir información sobre Bellavista Criadero Dorper.";

    whatsappLink.href =
      `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;

    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
  } else {
    whatsappLink.removeAttribute("href");
    whatsappLink.setAttribute("aria-disabled", "true");
    whatsappLink.title = "WhatsApp pendiente de configurar";
    whatsappLink.style.opacity = "0.6";
    whatsappLink.style.cursor = "not-allowed";
  }
}

// ==========================================
// ARTÍCULOS Y NOVEDADES
// ==========================================

// Aquí se agregarán publicaciones reales.

const novedades = [
  // EJEMPLO:
  //
  // {
  //   titulo: "Nuevo nacimiento en Bellavista",
  //   fecha: "2026-10-23",
  //   descripcion: "Información del nacimiento.",
  //   imagen: "assets/nacimiento.jpg"
  // }
];

const newsGrid = document.getElementById("newsGrid");

function mostrarNovedades() {
  if (!newsGrid) return;

  newsGrid.replaceChildren();

  if (novedades.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent =
      "Aquí compartiremos noticias y acontecimientos del criadero.";

    newsGrid.appendChild(mensaje);
    return;
  }

  novedades.forEach(novedad => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "news-card";

    const imagen = document.createElement("img");
    imagen.src = novedad.imagen;
    imagen.alt = novedad.titulo;
    imagen.loading = "lazy";

    const contenido = document.createElement("div");
    contenido.className = "news-card-content";

    const fecha = document.createElement("p");
    fecha.textContent = novedad.fecha;

    const titulo = document.createElement("h3");
    titulo.textContent = novedad.titulo;

    const descripcion = document.createElement("p");
    descripcion.textContent = novedad.descripcion;

    contenido.append(fecha, titulo, descripcion);
    tarjeta.append(imagen, contenido);

    newsGrid.appendChild(tarjeta);
  });
}

mostrarNovedades();

// ==========================================
// ANIMACIONES AL DESPLAZARSE
// ==========================================

const elementosAnimados = document.querySelectorAll(
  ".intro, .category-card, .animal-card, " +
  ".genetics-item, .management-grid article, " +
  ".ranch-gallery, .news-card"
);

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observador = new IntersectionObserver(
    entradas => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elementosAnimados.forEach(elemento => {
    elemento.classList.add("reveal");
    observador.observe(elemento);
  });
} else {
  elementosAnimados.forEach(elemento => {
    elemento.classList.add("visible");
  });
}

// ==========================================
// FINAL
// ==========================================

console.log("Bellavista - Criadero Dorper");