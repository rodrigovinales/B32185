const socket = io();


const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {

    e.preventDefault()

    const producto = {
        title: formAgregarProducto[0].value,
        price: formAgregarProducto[1].value,
        thumbnail: formAgregarProducto[2].files[0].name,
    }

    socket.emit('update', producto);

    formAgregarProducto.reset()
})

socket.on('productos', manejarEventoProductos);

async function manejarEventoProductos(productos) {

    const recursoRemoto = await fetch('plantillas/tabla.hbs')

    const textoPlantilla = await recursoRemoto.text()


    const functionTemplate = Handlebars.compile(textoPlantilla)

    const html = functionTemplate({ productos })

    document.getElementById('productos').innerHTML = html
}

function mostrarMensajes(mensajes) {        

    const mensajesParaMostrar = mensajes.map(({ fecha, autor, texto }) => {
        return `<li>${fecha} - ${autor}: ${texto}</li>`
    })

    const mensajesHtml = `
<ul>
${mensajesParaMostrar.join('\n')}
</ul>`

    const listaMensajes = document.getElementById('listaMensajes')
    listaMensajes.innerHTML = mensajesHtml

}

socket.on('mensajesActualizados', mensajes => {
    mostrarMensajes(mensajes)
})

const botonEnviar = document.getElementById('botonEnviar')
botonEnviar.addEventListener('click', e => {
    const inputAutor = document.getElementById('inputAutor')
    const inputMensaje = document.getElementById('inputMensaje')
    if (inputAutor.value && inputMensaje.value) {
        const mensaje = {
            autor: inputAutor.value,
            texto: inputMensaje.value
        }
        socket.emit('nuevoMensaje', mensaje)
    } else {
        alert('ingrese algun mensaje')
    }
})