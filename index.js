// Cargar el archivo JSON y mostrar su contenido en la consola
    async function cargarJSON() {
        console.log("Cargando JSON...");
        try {
            const respuesta = await fetch('reto3/conf/configES.json');
            const datos = await respuesta.json();
            console.log("JSON cargado:");

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
            console.log("Datos de perfil cargados:", perfil);

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


cargarJSON(); // Llamar a la función para cargar y mostrar el JSON
cargarDatos(); // Llamar a la función para cargar y mostrar los datos