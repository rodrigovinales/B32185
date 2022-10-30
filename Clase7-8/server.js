const express = require('express')
const fs = require('fs')
const app = express()
const { apiRouter } = require('./apis/apiRouter.js')


// MiddleWares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/public", express.static('archivos'))

// Ruta utilizada
app.use('/api/productos', apiRouter)



//Conecta Puerto
function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        const servidorConectador = app.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on("error", error => reject(error))
    })
}

module.exports = { conectar }