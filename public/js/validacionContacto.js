const formContacto = document.querySelector(".formulario_contacto");

formContacto.addEventListener("submit" , (event) => {
    
    const inputText = document.getElementsByClassName("item_formulario_contacto");

    for (let i = 0; i < inputText.length; i++) {
        
        if (inputText[i].value.trim().length < 3 ) {
            alert(`Debe completar el campo "${inputText[i].getAttribute("id").toUpperCase()}"`);
            event.preventDefault();
            return;
        }        
    }
    
    if(!document.querySelector('input[name="condicion"]:checked')){
        event.preventDefault();
        alert("Debe indicar si está asociado o no");
        return;
    }

    const acepto = document.getElementById("terminos");

    if (!acepto.checked){
        event.preventDefault();
        alert("Debes aceptar los términos y condiciones")
        return;
    }

    alert("formulario enviado");
    
});