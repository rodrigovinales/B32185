const express = require('express')
const app = express()
const multer = require('multer')
const { apiRouter } = require('./apis/apiRouter.js')


// MiddleWares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/public", express.static('archivos'))


// Ruta utilizada
app.use('/api/productos', apiRouter)



/// Utilizamos Multer
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

let storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, __dirname + '/public')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

let subidas = multer({storage: storage})


app.post('/uploadfiles', subidas.single('miArchivo'), (req, res, next) => {
    const file = req.file
    if(!file) {
        const error = new Error('Suba un archivo')
        error.httpStatusCode=400
        return next(error)
    }
    res.send(file)
})

/////////////////////////////////////////////////////////////////



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