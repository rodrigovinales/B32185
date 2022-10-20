const express = require('express')
const app = express()
const PORT = 8080 

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

