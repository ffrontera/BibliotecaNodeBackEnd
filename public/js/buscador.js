document.getElementById('buscador').onsubmit = function () {
    window.location = './pages/listado.html?u=' + document.getElementById('valorBuscado').value;
    return false;
  }