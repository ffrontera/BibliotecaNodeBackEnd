const formIngreso = document.querySelector(".formularioIngreso");
const formRegistro = document.querySelector(".formularioRegistro");
const form = document.querySelector('#login');
const formRegister = document.querySelector("#register");

const validarIngreso = formIngreso.addEventListener("submit", async (event) => {
    const inputText = document.getElementsByClassName("item_formulario_ingreso");

    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i].value.trim().length < 3) {
            alert(
                `Debe completar el campo "${inputText[i]
                    .getAttribute("id")
                    .toUpperCase()}"`
            );
            event.preventDefault();
            return;
        }
    }
    event.preventDefault();
    const data = {
        mail: document.getElementById("mail_l").value,
        pssword: document.getElementById("password_l").value,
    };

    try {
        const response = await fetch("../../auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        const responseDiv = document.querySelector("#response");
        if (response.ok) {
            sessionStorage.setItem('token', responseData.token);
            sessionStorage.setItem('userId', responseData.id);
            if (!responseData.isAdmin) {
                window.location.href = "socio.html";
                // responseDiv.innerHTML = `<p>Acceso no autorizado para su rol.</p>`;
            } else {
                window.location.href = 'admin.html'
            }
        } else {
            // Mostrar mensaje de error en caso de credenciales inválidas u otro error
            responseDiv.innerHRML = responseData.message; //`<p>${}</p>`;
        }
    } catch (err) {
        console.error("Error al procesar la solicitud:", err);
        const responseDiv = document.querySelector("#response");
        responseDiv.innerHTML = `<p>Error: ${err.message}</p>`;
    }
});

const validarRegistro = formRegistro.addEventListener("submit", async (event) => {
    const inputText = document.getElementsByClassName("datos");

    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i].value.trim().length < 3) {
            alert(
                `Debe completar el campo "${inputText[i]
                    .getAttribute("id")
                    .toUpperCase()}"`
            );
            event.preventDefault();
            return;
        }
    }

    const pssw = document.querySelector("#pssword");
    const psswR = document.querySelector("#contraseñaR");

    if (pssw.value != psswR.value) {
        alert("Las contraseñas no coinciden");
        event.preventDefault();
        return;
    }

    const acepto = document.getElementById("terminos");

    if (!acepto.checked) {
        event.preventDefault();
        alert("Debes aceptar los términos y condiciones");
        return;
    }

    event.preventDefault();
    const data = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        mail: document.getElementById("mail").value,
        pssword: document.getElementById("pssword").value,
        tel: document.getElementById("tel").value,
    };
    try {
        const response = await fetch("../../auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseData = response.json();
        console.log(responseData);
        if (response.ok) {
            sessionStorage.setItem('token', responseData.token);
            sessionStorage.setItem('userId', responseData.id);
            window.location.href = "socio.html";
        } else {
            const responseDiv = document.querySelector("#response");
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
