const express = require('express')
const app = express()
// import express from 'express'
const { Server: HttpServer } = require('http')
// import HttpServer from 'http'
const { Server: Socket } = require('socket.io')
// import * as Socket from 'socket.io'
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const {routerProductos, producto} = require('./routes/routerProductos')

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api', routerProductos)

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
        mensaje.date = new Date().toLocaleString()
        mensajes.guardarMensajes(mensaje)
        io.sockets.emit('mensajesActualizados', contenidoMensajes)
    })
});


//--------------------------------------------

const PORT = 8081
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server activo en http://localhost:${connectedServer.address().port}`);
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
