const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const Mensajes = require('./apis/apiMensajes');
const Producto = require('./apis/apiProducto.js')
const mensajes = new Mensajes;
const productos = new Producto;

//--------------------------------------------
// configuro el socket

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!');
    let contenidoProductos = productos.getAllProductos()
    let contenidoMensajes = mensajes.getAllMensajes()
    socket.emit('productos', contenidoProductos);
    socket.emit('mensajesActualizados', contenidoMensajes)

    socket.on('update', producto => {
        productos.guardarProducto(producto)
        io.sockets.emit('productos', contenidoProductos);
    })

    socket.on('nuevoMensaje', mensaje => {
        mensaje.fecha = new Date().toLocaleString()
        mensajes.guardarMensajes(mensaje)
        io.sockets.emit('mensajesActualizados', contenidoMensajes)
    })
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server activo en http://localhost:${connectedServer.address().port}`);
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
