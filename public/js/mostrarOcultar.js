const iniciarSesion = document.getElementById("toggleIniciosesion");
const registro = document.getElementById("toggleRegistro");
const botonIngresar = document.getElementById("botonIngresar");
const botonRegistro = document.getElementById("botonRegistro");
const contenedorRegistro = document.getElementById("contenedorRegistro");
const contenedorInicio = document.getElementById("contenedorInicioSesion");

iniciarSesion.addEventListener("click", () => {
    contenedorInicio.style.display = "flex";
    contenedorRegistro.style.display = "none";
});
botonIngresar.addEventListener("click", () => {
    contenedorInicio.style.display = "flex";
    contenedorRegistro.style.display = "none";
});
registro.addEventListener("click", () => {
    contenedorInicio.style.display = "none";
    contenedorRegistro.style.display = "flex";
});
botonRegistro.addEventListener("click", () => {
    contenedorInicio.style.display = "none";
    contenedorRegistro.style.display = "flex";
});