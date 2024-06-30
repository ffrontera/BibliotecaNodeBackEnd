fetch("../../books")
.then((response) => response.json())
.then((data) => {
  const librosContainer = document.getElementById("card_box");
  let librosMostrados = [];
  data.forEach((libro) => {
    // Crear elementos HTML para el libro
    const imagenElement = document.createElement("img");
    imagenElement.src = libro.tapa; // Asignar la ruta de la imagen
    imagenElement.alt = `Portada de ${libro.titulo}`;

    const libroElement = document.createElement("div");
    libroElement.classList.add("libro");
    libroElement.setAttribute("data-titulo", libro.titulo);

    const frenteElement = document.createElement("div");
    frenteElement.classList.add("frente");

    const dorsoElement = document.createElement("div");
    dorsoElement.classList.add("dorso");

    const tituloElement = document.createElement("h4");
    tituloElement.textContent = libro.titulo;

    const resumenElement = document.createElement("p");
    resumenElement.classList.add("resumen");
    resumenElement.textContent = libro.resumen;

    const editorialElement = document.createElement("p");
    editorialElement.classList.add("left");
    editorialElement.textContent = `ISBN: ${libro.ISBN}`;

    const autorElement = document.createElement("p");
    autorElement.classList.add("left");
    autorElement.textContent = `Autor: ${libro.nombre}`;

    const generoElement = document.createElement("p");
    generoElement.classList.add("left");
    generoElement.textContent = `Género: ${libro.genero}`;

    frenteElement.appendChild(imagenElement);
    dorsoElement.appendChild(tituloElement);
    dorsoElement.appendChild(resumenElement);
    dorsoElement.appendChild(editorialElement);
    dorsoElement.appendChild(autorElement);
    dorsoElement.appendChild(generoElement);

    libroElement.appendChild(frenteElement);
    libroElement.appendChild(dorsoElement);

    librosContainer.appendChild(libroElement);

    librosMostrados.push(libro);
  });

  document
    .getElementById("buscador")
    .addEventListener("keyUp", function (event) {
      
      const query = event.target.value.trim().toLowerCase();
      console.log(query);
      const results = data.filter((libro) =>
        libro.titulo.toLowerCase().includes(query)
      );
      librosMostrados = results;
      // Ocultar todos los libros
      librosContainer.querySelectorAll(".libro").forEach((libro) => {
        libro.style.display = "none";
      });

      // Mostrar solo los libros que coinciden con la búsqueda
      results.forEach((libro) => {
        const libroElement = librosContainer.querySelector(
          `[data-titulo="${libro.titulo}"]`
        );
        if (libroElement) {
          libroElement.style.display = "block";
        }
      });
    }
  );
})
.catch((error) => {
  console.error("Error al cargar el archivo JSON:", error);
});
