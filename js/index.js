const rutaDelArchivo = window.location.pathname;
const nombreDelArchivo = rutaDelArchivo.substring(rutaDelArchivo.lastIndexOf('/') + 1);

const paramslang = new URLSearchParams(window.location.search);

if (!paramslang.has("lang")) { // Verificamos si ya hay un parámetro ?lang en la URL, si no lo hay, lo agregamos
    paramslang.set("lang", "es"); // Establecemos el parámetro lang en la URL
    window.location.search = paramslang.toString(); // Actualizamos la URL con el nuevo parámetro
    console.log(paramslang.get("lang")); // Imprimimos el valor del parámetro lang en la consola
}


// Cargar el archivo JSON y mostrar su contenido en la consola
async function cargarJSON(lang) {
    console.log("Cargando JSON...");
    let idioma = lang; // Convertir el idioma a mayúsculas para que coincida con el nombre del archivo
    if (idioma === 'en') {
        idioma = 'configEN.json';
    } else if (idioma === 'es') {
        idioma = 'configES.json';
    } else if (idioma === 'pt') {
        idioma = 'configPT.json';
    } else {
        idioma = 'configES.json'; // Valor por defecto si no se proporciona un idioma válido
    }

    try {
        const respuesta = await fetch(`conf/${idioma}`);
        const datos = await respuesta.json();
        console.log("JSON cargado");

        const parrafoColor = document.querySelector('.color');
        parrafoColor.textContent = datos.color; // Mostrar el color en el párrafo con clase "color"    

        const parrafoLibro = document.querySelector('.libro');
        parrafoLibro.textContent = datos.libro; // Mostrar el libro en el párrafo con clase "libro"

        const parrafoMusica = document.querySelector('.musica');
        parrafoMusica.textContent = datos.musica; // Mostrar la música en el párrafo con clase "musica"

        const parrafoVideojuego = document.querySelector('.video_juego');
        parrafoVideojuego.textContent = datos.video_juego; // Mostrar el videojuego en el párrafo con clase "video_juego"

        const parrafoLenguaje = document.querySelector('.lenguajes');
        parrafoLenguaje.textContent = datos.lenguajes; // Mostrar el lenguaje en el párrafo con clase "lenguaje"

        const parrafoEmail = document.querySelector('.email');
        parrafoEmail.textContent = datos.email; // Mostrar el email en el párrafo con clase "email" 


    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
}


async function cargarDatos(cedula) {
    console.log("Cargando datos...");
    ci = cedula ? cedula : '21407463'; // Si no se proporciona una cédula, se asigna un valor por defecto
    try {
        const respuesta = await fetch(`${ci}/perfil.json`);
        const perfil = await respuesta.json();
        console.log("Datos de perfil cargados.");

        const foto = document.querySelector('.img-perfil');
        foto.src = `${ci}/${perfil.imagen}`; // Usamos la ruta de la imagen del JSON

        const parrafoNombre = document.querySelector('.nombre');
        parrafoNombre.textContent = perfil.nombre; // Mostrar el nombre en el párrafo con clase "nombre"

        const parrafoColor = document.querySelector('.color');
        parrafoColor.textContent = parrafoColor.textContent + perfil.color; // Mostrar el color en el párrafo con clase "color"

        const parrafoLibro = document.querySelector('.libro');
        parrafoLibro.textContent = parrafoLibro.textContent + perfil.libro; // Mostrar el libro en el párrafo con clase "libro"

        const parrafoMusica = document.querySelector('.musica');
        parrafoMusica.textContent = parrafoMusica.textContent + perfil.musica; // Mostrar la música en el párrafo con clase "musica"

        const parrafoVideojuego = document.querySelector('.video_juego');
        parrafoVideojuego.textContent = parrafoVideojuego.textContent + perfil.video_juego; // Mostrar el videojuego en el párrafo con clase "video_juego"

        const parrafoLenguaje = document.querySelector('.lenguajes');
        parrafoLenguaje.textContent = parrafoLenguaje.textContent + perfil.lenguajes; // Mostrar el lenguaje en el párrafo con clase "lenguaje"

        const parrafoEmail = document.querySelector('.email');
        parrafoEmail.textContent = parrafoEmail.textContent + perfil.email; // Mostrar el email en el párrafo con clase "email"

    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }

}


async function cargarIndex(lang) {
    console.log("Cargando index...");
    let idioma = lang; // Convertir el idioma a mayúsculas para que coincida con el nombre del archivo
    console.log(idioma);
    if (idioma === 'en') {
        idioma = 'configEN.json';
    } else if (idioma === 'es') {
        idioma = 'configES.json';
    } else if (idioma === 'pt') {
        idioma = 'configPT.json';
    } else {
        idioma = 'configES.json'; // Valor por defecto si no se proporciona un idioma válido
    }
    try {
        const respuesta = await fetch(`conf/${idioma}`);
        const datos = await fetch('21407463/perfil.json');
        const perfil = await datos.json();
        const index = await respuesta.json();
        console.log("Index cargado.");

        const parrafoSitio = document.querySelector('.sitio');

        sitio = `${index.sitio[0]} <sub>${index.sitio[1]}</sub> ${index.sitio[2]}`; // Crear la cadena del sitio
        parrafoSitio.innerHTML = sitio; // Mostrar el sitio en el párrafo con clase "sito"
       

        const parrafoSaludo = document.querySelector('.saludo');
        parrafoSaludo.textContent = index.saludo + ' ' + perfil.nombre; // Mostrar el saludo en el párrafo con clase "saludo"

        const parrafoBuscar = document.querySelector('.buscar');
        parrafoBuscar.textContent = index.buscar; // Mostrar el buscar en el párrafo con clase "buscar"

        const parrafoCopyright = document.querySelector('.copy_right');
        parrafoCopyright.textContent = index.copyRight; // Mostrar el copyright en el párrafo con clase "copy_right"

    } catch (error) {
        console.error('Error al cargar el archivo index:', error);
    }
}


async function cargarAlumnos() {
    console.log("Cargando alumnos...");
    try {
        const respuesta = await fetch('datos/index.json');
        const alumnos = await respuesta.json();
        console.log("Alumnos cargados.");

        // Cargando los alumos en la pagina
        const contenedorPrincipal = document.getElementById('contenedor-principal');

        if (contenedorPrincipal && Array.isArray(alumnos)) {
            alumnos.forEach(persona => {
                // Crear el elemento <ul>
                const ulElement = document.createElement('ul');
                ulElement.classList.add('cuadro-informativo');
                ulElement.addEventListener('click', function () {
                    const ci = persona.ci; 
                    window.location.href = `perfil.html?ci=${persona.ci}`; 
                }
                );
                // Crear el elemento <li>
                const liElement = document.createElement('li');
                liElement.classList.add('titulo-cuadro');

                // Crear la imagen <img>
                const imgElement = document.createElement('img');
                imgElement.classList.add('img-index');
                imgElement.src = `${persona.imagen}`; // Usamos la ruta de la imagen del JSON
                imgElement.alt = persona.nombre; // Usamos el nombre como texto alternativo

                // Crear el párrafo <p> para el nombre
                const pElement = document.createElement('p');
                pElement.classList.add('contenido-cuadro');
                pElement.textContent = persona.nombre;

                // Agregar la imagen y el párrafo al <li>
                liElement.appendChild(imgElement);
                liElement.appendChild(pElement);

                // Agregar el <li> al <ul>
                ulElement.appendChild(liElement);

                // Agregar el <ul> al contenedor principal en tu HTML
                contenedorPrincipal.appendChild(ulElement);
            });
        } else {
            console.error('El contenedor principal no se encontró o los datos JSON no son un array.');
        }

    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
}

if (nombreDelArchivo === 'index.html') {
    document.addEventListener('DOMContentLoaded', function () {
        const urlParams = new URLSearchParams(window.location.search);
        const lang = urlParams.get('lang'); // Obtener el valor del parámetro "lang" de la URL
        cargarIndex(lang); // Llamar a la función para cargar y mostrar el index
        cargarAlumnos(); // Llamar a la función para cargar y mostrar los alumnos

        boton = document.querySelector('.buscar');
        /*boton2 = document.querySelector('.reset');

        boton2.addEventListener('click', function () {
            mensaje = document.querySelector('.mensaje');
            if (mensaje) {
                mensaje.remove(); // Eliminar el mensaje de error si existe
            }

            const divContenedor = document.querySelector('#contenedor-principal'); 
            const listasUl = divContenedor.querySelectorAll('ul'); // Selecciona todos los ul dentro del div
            console.log("Resetear busqueda"); // Imprimir en la consola
            listasUl.forEach(function (lista) {
                    lista.style.display = 'block';
            });
        });*/

        boton.addEventListener('click', function () {
            if (document.querySelector('.mensaje')) {
                document.querySelector('.mensaje').remove(); // Eliminar el mensaje de error si existe
            }
            const input = document.querySelector('.input-buscar');
            valor = (input.value).toString(); // Obtener el valor del input y convertirlo a string
            valor = valor.toUpperCase(); // Convertir el valor a mayúsculas
            console.log(valor); // Imprimir el valor en la consola
            const divContenedor = document.querySelector('#contenedor-principal');
            const listasUl = divContenedor.querySelectorAll('ul'); // Selecciona todos los ul dentro del div
            let contador = 0; // Inicializa un contador para contar los elementos que coinciden con el valor de búsqueda
            
            listasUl.forEach(function (lista) {
                const nombreEstudiante = lista.querySelector('.contenido-cuadro').textContent; // Obtener el texto del párrafo dentro del ul
                const cadena = nombreEstudiante.toUpperCase(); // Convertir la cadena a mayúsculas para la comparación
                const estaContenido = cadena.includes(valor);
                console.log(estaContenido); // Imprimir el resultado de la comparación en la consola
             if (!estaContenido) {
                    lista.style.display = 'none';
                    contador++; // Incrementar el contador si no coincide 
                }else {
                    lista.style.display = 'block'; // Mostrar el elemento si coincide
                }
            });

            if (contador === listasUl.length) { // Si el contador es igual al número total de listas, significa que no se encontró ninguna coincidencia
                document.querySelector('#contenedor-principal').insertAdjacentHTML('beforeend', `<h2 class="mensaje">No hay alumnos llamados: ${input.value}</h2>`); // Mostrar un mensaje de alerta
                document.querySelector('.mensaje').style.color = "#83afe7"; // Cambiar el color del mensaje a azul
            }
        });

    })
}
if (nombreDelArchivo === 'perfil.html') {
    document.addEventListener('DOMContentLoaded', function () {
        const urlParams = new URLSearchParams(window.location.search);
        const ci = urlParams.get('ci'); // Obtener el valor del parámetro "ci" de la URL
        const lang = urlParams.get('lang'); // Obtener el valor del parámetro "lang" de la URL
        cargarJSON(lang); // Llamar a la función para cargar y mostrar el JSON
        cargarDatos(ci); // Llamar a la función para cargar y mostrar los datos
    })
}

