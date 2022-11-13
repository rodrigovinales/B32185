const fs = require('fs')

class Mensajes {
    constructor() {
        this.mensajes = []
    }

    getAllMensajes() {

        let resultado = fs.readFileSync('./mensajes.txt', 'utf-8')
        let contenido = (this.mensajes = JSON.parse(resultado))
        return contenido
    }

    guardarMensajes(mensaje){
        this.mensajes.push(mensaje);
        fs.writeFileSync("./mensajes.txt", JSON.stringify(this.mensajes, null, '\t'));
    }


}


module.exports = Mensajes;
// exports.getById = getById;
// exports.postProductos = postProductos;
// exports.putProductos = putProductos;
// exports.deleteProducto = deleteProducto;
