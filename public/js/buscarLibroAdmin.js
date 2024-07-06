const searchButton = document.querySelector("#search");

searchButton.addEventListener("click", async () => {
  const searchData = document.getElementById("searchData").value.trim();

  const inputTitulo = document.getElementById("titulo");
  const inputResumen = document.getElementById("resumen");
  const inputGenero = document.getElementById("genero");
  const inputISBN = document.getElementById("ISBN");
  const inputAutor = document.getElementById("id_autor");

  if (!searchData) {
    alert("Por favor, ingrese el título del libro.");
    return;
  }

  try {
    const response = await fetch(
      `../books/${encodeURIComponent(searchData)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al buscar el libro");
    }

    const libro = await response.json();

    // Mostrar los datos del libro en el formulario

    if (inputTitulo != null) {
      inputTitulo.value = libro[0].titulo;
    }
    if (inputResumen != null) {
      inputResumen.value = libro[0].resumen;
    }
    if (inputGenero != null) {
      inputGenero.value = libro[0].genero;
    }
    if (inputISBN != null) {
      inputISBN.value = libro[0].ISBN;
    }
    if (inputAutor != null) {
      inputAutor.value = libro[0].id_autor;
    }

    // Guardar el id de libro en el session storage
    sessionStorage.setItem("id", libro[0].id);

  } catch (error) {
    console.error(error);
    const responseDiv = document.getElementById("response");
    responseDiv.innerHTML = `<p>${error.message}</p>`;
    responseDiv.style.display = "block";
  }
});
