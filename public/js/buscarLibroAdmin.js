const searchButton = document.querySelector("#searchButton");
const formBusqueda = document.querySelector("#update");
const booksContainer = document.getElementById('libros-container');
let inputId = document.getElementById("id");
let inputTitulo = document.getElementById("titulo");
let inputResumen = document.getElementById("resumen");
let inputGenero = document.getElementById("genero");
let inputISBN = document.getElementById("ISBN");
let inputAutor = document.getElementById("id_autor");


searchButton.addEventListener("click", async () => {

    if (!inputId.value && !inputTitulo.value && !inputResumen.value && !inputGenero.value && !inputISBN.value && !inputAutor.value) {
        alert("Por favor, ingrese un valor para buscar el libro.");
        return;
    }

    let destino;
    let search;
    if (inputId.value) {
        if (inputId.value != 0) {
            destino = 'id/';
            search = inputId.value;
        } else {
            destino = '';
            search = '';
        }
    } else if (inputTitulo.value) {
        destino = '';
        search = inputTitulo.value.trim();
    } else if (inputGenero.value) {
        destino = 'gender/';
        search = inputGenero.value.trim();
    } else if (inputISBN.value) {
        destino = 'ISBN/';
        search = inputISBN.value;
    } else {
        destino = 'author/';
        search = inputAutor.value.trim();
    }

    try {
        const response = await fetch(
            `../books/${destino}${search}`,
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

        const books = await response.json();

        // Mostrar los datos del libro en el formulario
        booksContainer.innerHTML = '';
        books.forEach(book => {
            const html = `<tr data-id='${book.id}' >
                  <td>${book.id}</td>
                  <td>${book.titulo}</td>
                  <td>${book.nombre}</td>
                  </tr>
              `;
            booksContainer.innerHTML += html;
        }
        );

        booksContainer.addEventListener('click', (event) => {
            const idBook = event.target.closest('tr').dataset.id;
            sessionStorage.removeItem('id');
            sessionStorage.setItem('id', idBook);

            document.querySelector('.buscar').style.display = 'none';
            document.querySelector('.acciones').style.display = 'flex';

            const book = books.find((book) => book.id == sessionStorage.getItem('id'));
            inputId.value = idBook;
            inputId.disabled = true;
            inputTitulo.value = book.titulo;
            inputResumen.value = book.resumen;
            inputGenero.value = book.genero;
            inputISBN.value = book.ISBN;
            inputAutor.value = book.nombre;
        })



        // Guardar el id de libro en el session storage
        // sessionStorage.setItem("id", libro[0].id);

    } catch (error) {
        console.error(error);
        const responseDiv = document.getElementById("response");
        responseDiv.innerHTML = `<p>${error.message}</p>`;
        responseDiv.style.display = "block";
    }
});

const clearForm = document.querySelector('#clearForm');

clearForm.addEventListener('click', () => {
    inputId.value = '';
    inputId.disabled = false;
    inputTitulo.value = '';
    inputResumen.value = '';
    inputGenero.value = '';
    inputISBN.value = '';
    inputAutor.value = '';
    booksContainer.innerHTML = '';
    document.querySelector('.buscar').style.display = 'flex';
    document.querySelector('.acciones').style.display = 'none';
})
