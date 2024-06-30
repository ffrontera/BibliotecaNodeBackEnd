document.getElementById('buscador').onsubmit = function () {
    window.location = 'listado.html?u=' + document.getElementById('valorBuscado').value;
    return false;
  }