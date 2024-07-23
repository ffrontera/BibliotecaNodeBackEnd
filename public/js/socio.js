const fileImgTapa = document.querySelector("#tapa"),
    imgTapaPreview = document.querySelector("#tapaLibroPrevisializacion"),
    imgBanner = document.querySelector('#imagenLibroNull'),
    divPrestamo = document.querySelector('#prestamoActivo'),
    parrafoDetalle = document.querySelector('#detallePrestamo');

fetch('../../loans/1', {
    headers: { Authorization: ('Bearer ', sessionStorage.getItem('token')) }
})
    .then((response) => response.json())
    .then((data) => {
        const tapa = data[0].tapa;
        if ((!data[0] || !tapa.length) || data[0].concluido == true) {
            imgTapaPreview.src = "";
            imgBanner.style.display = 'block';
            imgTapaPreview.style.display = 'none';
            return;
        }
        // Ahora tomamos el primer archivo, el cual vamos a previsualizar

        // Lo convertimos a un objeto de tipo objectURL
        // Y a la fuente de la imagen le ponemos el objectURL
        imgTapaPreview.src = tapa;
        parrafoDetalle.innerHTML = `<p>fecha inicio: ${data[0].fecha_inicio.slice(0, 10)}</p> 
                                    <p>fecha finalizacion: ${data[0].fecha_fin.slice(0, 10)}</p>`;
        imgBanner.style.display = 'none';
        imgTapaPreview.style.display = 'block';
    });