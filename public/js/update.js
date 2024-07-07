document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#update");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = document.getElementById('id');
        const titulo = document.getElementById("titulo");
        const resumen = document.getElementById("resumen");
        const genero = document.getElementById("genero");
        const ISBN = document.getElementById("ISBN");
        const id_autor = document.getElementById("id_autor");
        let data = {
            titulo: titulo.value,
            resumen: resumen.value,
            genero: genero.value,
            ISBN: ISBN.value,
            id_autor: id_autor.value,
        };

        try {
            const response = await fetch(`../books/${id.value}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                },
            });

            if (response.headers.get("content-type")?.includes("application/json")) {
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(
                        responseData.message || "Error al actualizar el libro"
                    );
                } else {
                    const responseDiv = document.querySelector("#response");
                    responseDiv.innerHTML = "<p>Producto actualizado con éxito</p>";
                    responseDiv.style.display = "block";
                    id.value = '';
                    titulo.value = '';
                    resumen.value = '';
                    genero.value = '';
                    ISBN.value = '';
                    id_autor.value = '';
                }
            } else {
                const errorText = await response.text();
                throw new Error("Error en la respuesta del servidor: " + errorText);
            }
        } catch (error) {
            console.error(error);
            const responseDiv = document.querySelector("#response");
            responseDiv.innerHTML = `<p>${error.message}</p>`;
            responseDiv.style.display = "block";
        }
    });
});