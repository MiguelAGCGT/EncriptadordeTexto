function obtenerTexto() {
    let text = document.getElementById('textoIngresado').value;
    
    if (text  === '') {
        mostrarModal('Por favor ingrese un texto');
        return null;
    }else if (/[^a-z\s]/.test(text)){
        mostrarModal('No ingrese letras mayúsculas, con acentos, ni caracteres especiales.');
        return null;
    } else {
        return text;
    }
}

function conversion(variables) {
    switch (variables) {
        case 'a':
            return 'ai';
        case 'e':
            return 'enter';
        case 'i':
            return 'imes';
        case 'o':
            return 'ober';
        case 'u':
            return 'ufat'; 
        default:
            return variables;
    }
}

function elementosIniciales() {
    const originalHTML = `
        <img >
        <h2></h2>
        <p></p>
    `;
    document.querySelector('.main_contenido_resultado').innerHTML = originalHTML;
    return originalHTML;
}

function mostrarModal(mensaje) {
    document.querySelector('.modal_alertas').style.display = 'block';
    document.querySelector('.modal_sin_texto h2').innerHTML = mensaje;
    document.querySelector('.modal_sin_texto button').style.display = 'display';
}

function modal() {
    document.querySelector('.modal_alertas').style.display = 'block';
    
    const cerrarModal = document.querySelector('.cerrar_modal');
    
    cerrarModal.addEventListener('click', () =>{
        document.querySelector('.modal_alertas').style.display = 'none';
    });
    document.getElementById('textoIngresado').value = "";
    
    
}

function encriptar() {
    /* obtenemos el valor del textarea */
    let text = obtenerTexto();

    if (text === null) {
        modal();
        return;
    }

    /* Reemplazamos las vocales por frases */
    let textoEncriptado = text.replace(/[aeiou]/g, function(variables) {
        return conversion(variables);    
    });
    /* generamos las etiquetas del div para que el boton siga funcionando */
    let originalHTML = elementosIniciales();
    /* Remplazamos el contenido por las etiquetas */
  
    document.querySelector('.main_contenido_resultado h2').style.display = 'none';
    document.querySelector('.main_contenido_resultado p').style.display = 'none';
    document.querySelector('.main_contenido_resultado img').style.display = 'none';
    document.querySelector('.main_contenido_resultado').innerHTML += `<p id="textoEncriptado">${textoEncriptado}</p>`;
    document.querySelector('.main_contenido_resultado').innerHTML += `<button id="botonCopiar" onclick=Copiar();>Copiar</button>`;

}

function conversionInversa(variables2) {
    switch (variables2) {
        case 'ai':
            return 'a';
        case 'enter':
            return 'e';
        case 'imes':
            return 'i';
        case 'ober':    
            return 'o';
        case 'ufat':
            return 'u'; 
        default:
            return variables2;
    }
}

function desencriptar() {
    /* obtenemos el valor del textarea */
    let text = obtenerTexto();

    if (text === null) {
        modal();
        return;
    }

   let textoDesencriptado = text.replace(/ai|enter|imes|ober|ufat/g, function(variables2){
        return conversionInversa(variables2);
    } );

    /* Reemplazamos las vocales por frases */
    let originalHTML = elementosIniciales();

    

    /* Remplazamos el contenido por las etiquetas */
    document.querySelector('.main_contenido_resultado h2').style.display = 'none';
    document.querySelector('.main_contenido_resultado p').style.display = 'none';
    document.querySelector('.main_contenido_resultado img').style.display = 'none';
    document.querySelector('.main_contenido_resultado').innerHTML += `<p id="textoEncriptado">${textoDesencriptado}</p>`;
    document.querySelector('.main_contenido_resultado').innerHTML += `<button id="botonCopiar" onclick=Copiar();>Copiar</button>`;

}

function Copiar() {
    const text = document.getElementById('textoEncriptado').innerText;
    navigator.clipboard.writeText(text)
    .then(() => mostrarModal('Texto copiado al portapapeles'))
    .catch(err => mostrarModal('Error al copiar texto: '+ err));
   modal();
}
