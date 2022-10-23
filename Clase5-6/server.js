const express = require('express')
const fs = require('fs')
const app = express()
const ruta = "./productos.txt"

app.get("/", (req, res) => {
    let titulo = `<h1 style="color:red; background-color:whitesmoke; text-align:center">Clase BackEnd NPM Clase 5-6</h1><hr><a href="/productos"><button>IR A PRODUCTOS</button></a><hr><a href="/productoRandom"><button>IR A PRODUCTOS ALEATORIOS</button></a><hr><p>Click en los botones te ahorra de escribir en el navegador !!!</p>`
    res.send(titulo); // Pido que muestre en navegador el valor TITULO que utiliza botones y links
})

app.get('/productos', (req, res) => {
    (async () => {
        res.send(await fs.promises.readFile(ruta, 'utf-8'))
    })()

})

app.get('/productoRandom', (req, res) => {
    let randomNumber = Math.ceil(Math.random() * (5)) - 1;
    (async () => {
        try {
            const resultado = await fs.promises.readFile(ruta, 'utf-8')
            const conversion = JSON.parse(resultado)
            conversion.forEach(element => {
                if (randomNumber == element.id) {
                    res.send(element.title)
                }
            })
        }
        catch (err) {
            res.send(err)
        }
    })()
})

function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        const servidorConectador = app.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on("error", error => reject(error))
    })
}

module.exports = { conectar }