const rutaDelArchivo = window.location.pathname;
const nombreDelArchivo = rutaDelArchivo.substring(rutaDelArchivo.lastIndexOf('/') + 1);

// Cargar el archivo JSON y mostrar su contenido en la consola
    async function cargarJSON() {
        console.log("Cargando JSON...");
        try {
            const respuesta = await fetch('reto3/conf/configES.json');
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
            parrafoLenguaje.textContent = datos.lenguaje; // Mostrar el lenguaje en el párrafo con clase "lenguaje"

            const parrafoEmail = document.querySelector('.email');
            parrafoEmail.textContent = datos.email; // Mostrar el email en el párrafo con clase "email" 


        } catch (error) {
            console.error('Error al cargar el archivo JSON:', error);
        }
    }


    async function cargarDatos() {
        console.log("Cargando datos...");
        try {
            const respuesta = await fetch('reto3/21407463/perfil.json');
            const perfil = await respuesta.json();
            console.log("Datos de perfil cargados.");

            const parrafoNombre = document.querySelector('.nombre');
            parrafoNombre.textContent = perfil.nombre; // Mostrar el nombre en el párrafo con clase "nombre"

            const parrafoColor  = document.querySelector('.color'); 
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


    async function cargarIndex() {
        console.log("Cargando index...");
        try {
            const respuesta = await fetch('reto3/conf/configEs.json');
            const index = await respuesta.json();
            console.log("Index cargado.");

            const parrafoSitio = document.querySelector('.sitio');
            index.sitio.forEach(element => {
                parrafoSitio.textContent = parrafoSitio.textContent+' '+element; // Mostrar el sitio en el párrafo con clase "sito"
            });

            const parrafoSaludo = document.querySelector('.saludo');
            parrafoSaludo.textContent = index.saludo; // Mostrar el saludo en el párrafo con clase "saludo"

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
            const respuesta = await fetch('reto3/datos/index.json');
            const alumnos = await respuesta.json();
            console.log("Alumnos cargados.");

            // Cargando los alumos en la pagina
            const contenedorPrincipal = document.getElementById('contenedor-principal'); // Asegúrate de tener un elemento con este ID en tu HTML

            if (contenedorPrincipal && Array.isArray(alumnos)) {
                alumnos.forEach(persona => {
                    // Crear el elemento <ul>
                    const ulElement = document.createElement('ul');
                    ulElement.classList.add('cuadro-informativo');
                
                    // Crear el elemento <li>
                    const liElement = document.createElement('li');
                    liElement.classList.add('titulo-cuadro');
                
                    // Crear la imagen <img>
                    const imgElement = document.createElement('img');
                    imgElement.classList.add('img-index');
                    imgElement.src = `reto3/${persona.imagen}`; // Usamos la ruta de la imagen del JSON
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
    cargarIndex(); // Llamar a la función para cargar y mostrar el index
    cargarAlumnos(); // Llamar a la función para cargar y mostrar los alumnos
}
if (nombreDelArchivo === 'perfil.html') {
    cargarJSON(); // Llamar a la función para cargar y mostrar el JSON
    cargarDatos(); // Llamar a la función para cargar y mostrar los datos
}
