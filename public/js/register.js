document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#register");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = {
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            mail: document.getElementById("mail").value,
            pssword: document.getElementById("pssword").value,
            tel: document.getElementById("tel").value,
        };
        console.log("Datos capturados del formulario:", data);
        try {
            const response = await fetch("../../auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            const responseDiv = document.querySelector("#response");
            if (response.ok) {
                alert("Usuario registrado con éxito");
            } else {
                responseDiv.innerHTML = `<p>${responseData.message}</p>`;
                responseDiv.style.display = "block";
            }
        } catch (err) {
            console.error("Error al procesar la solicitud:", err);
            const responseDiv = document.querySelector("#response");
            responseDiv.innerHTML = `<p>Error: ${err.message}</p>`;
            responseDiv.style.display = "block";
        }
    });
});