const express = require('express')
const { engine } = require ('express-handlebars');

const app = express()
const { apiRouter } = require('./apis/apiRouter.js')

// MiddleWares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

////// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// app.set("views", "./views");
app.set("views", __dirname + "/views");


// Ruta utilizada
app.use('/', apiRouter)

app.get("/", (req, res, next) => {
    res.render("formulario")
})


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