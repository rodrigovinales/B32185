const http = require('http')
const express = require('express')
const app = express()
const PORT = 1977



// const server = http.createServer((peticion, respuesta) => {
//     respuesta.end('Hola mundo')
//  })
 
//  const connectedServer = server.listen(8080, () => {
//     console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
//  })
 

app.get('/productos', (req, res) => {
    res.send({ mensaje: 'Pagina Productos' })
 })
 
 app.get('/productoRandom', (req, res) => {
    res.send({ mensaje: 'Pagina Randoms' })
 })


const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

