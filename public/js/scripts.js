document.addEventListener('DOMContentLoaded', function () {
    fetch('/books')
        .then(res => res.json())
        .then(libros => {
            const agendasContainer = document.getElementById('libros-container');
            libros.forEach(libro => {
                    const agendaCard = document.createElement('div');
                    agendaCard.classList.add(`id_${libro.id}`);
                    agendaCard.innerHTML = `
                        <li>Libro: ${libro.titulo}, Autor: ${libro.nombre}</li>
                    `;
                    agendasContainer.appendChild(agendaCard);
                }
            );
        })
        .catch(error => console.error('Error al obtener las agendas:', error));
});