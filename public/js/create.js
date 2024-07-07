const fileImgTapa = document.querySelector("#tapa"),
    imgTapaPreview = document.querySelector("#tapaLibroPrevisializacion"),
    imgBanner = document.querySelector('#imagenLibroNull')

    fileImgTapa.addEventListener("change", () => {
        const archivos = fileImgTapa.files;
        if (!archivos || !archivos.length) {
          imgTapaPreview.src = "";
          imgBanner.style.display = 'block';
          imgTapaPreview.style.display = 'none';
          return;
        }
        // Ahora tomamos el primer archivo, el cual vamos a previsualizar
        const primerArchivo = archivos[0];
        // Lo convertimos a un objeto de tipo objectURL
        const objectURL = URL.createObjectURL(primerArchivo);
        // Y a la fuente de la imagen le ponemos el objectURL
        imgTapaPreview.src = objectURL;
        imgBanner.style.display = 'none';
        imgTapaPreview.style.display = 'block';
      });

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#create");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(form);
        fetch("../../books", {
            method: "POST",
            body: data,
            headers: {
                contentType: 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const responseDiv = document.querySelector("#response");
                if (data.message) {
                    responseDiv.innerHTML = `<p>${data.message}</p>`;
                } else {
                    responseDiv.innerHTML = "<p>Libro creado con éxito</p>";
                }
                responseDiv.style.display = "block";
            })
            .catch((err) => {
                document.querySelector("#response").innerHTML = `<p>${err}</p>`;
            });
    });
});
