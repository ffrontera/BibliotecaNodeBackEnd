const form = document.querySelector('#delete');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();

  try {
    const response = await fetch(`../../books/${encodeURIComponent(title)}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al eliminar libro');
    }

    const responseDiv = document.querySelector('#response');

    responseDiv.innerHTML = '<p>Libro eliminado con éxito</p>';
    responseDiv.style.display = 'block';

    document.getElementById('title').value = '';

  } catch (error) {
    console.error(error);
    const responseDiv = document.querySelector('#response');
    responseDiv.innerHTML = `<p>${error.message}</p>`;
    responseDiv.style.display = 'block';
  }
});