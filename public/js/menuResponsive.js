const element = document.getElementById("menuResponsive");
  element.addEventListener("click", myFunction);

  function myFunction() {
    let menu = document.getElementById("menu");
    menu.classList.toggle("menuDesplegado");
  }