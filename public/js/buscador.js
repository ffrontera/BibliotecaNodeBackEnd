document.getElementById('buscador').onsubmit = function () {
    window.location = './pages/listado.html?titulo=' + document.getElementById('valorBuscado').value;
    return false;
  }