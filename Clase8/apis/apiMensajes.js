const fs = require('fs')

const { mariaDB } = require("../database/mariaDB")
const knex = require("knex")(mariaDB)

class Mensajes {
    constructor() {
        this.mensajes = []
    }

    getAllMensajes() {

        let resultado = fs.readFileSync('./mensajes.txt', 'utf-8')
        let contenido = (this.mensajes = JSON.parse(resultado))
        let response = knex.from("mensajes");
        return contenido
    }

    guardarMensajes(mensaje) {
        this.mensajes.push(mensaje);
        fs.writeFileSync("./mensajes.txt", JSON.stringify(this.mensajes, null, '\t'));
        knex("mensajes").insert(mensaje)
            .then(() => console.log("Mensaje ingresado con Exito"))
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                knex.destroy();
            })
    }


}


module.exports = Mensajes;
// exports.getById = getById;
// exports.postProductos = postProductos;
// exports.putProductos = putProductos;
// exports.deleteProducto = deleteProducto;
