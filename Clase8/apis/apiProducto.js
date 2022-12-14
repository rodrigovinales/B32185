// const fs = require('fs')

const { mariaDB } = require("../database/mariaDB")
const knex = require("knex")(mariaDB)

class Producto {
    constructor() {
        this.productos = [];
        this.id = 1;
    }

    getAllProductos() {
        (async () => {
        try {
            let responseFromMysql = await knex.from("productos");
            console.table(responseFromMysql);
            // const resultado = fs.readFileSync('./productos.txt', 'utf-8')
            // let contenido = (this.productos = JSON.parse(resultado))
            return responseFromMysql
        }
        catch (error) {
            res.json("No se encontrĂ³ el archivo y/o base de datos", error)
        }
    })();
    }


    guardarProducto(producto) {
        // this.productos.push(producto);
        knex("productos").insert(producto)
            .then(() => console.log("Productos ingresados con Exito"))
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                knex.destroy();
            })
        // fs.writeFileSync("./productos.txt", JSON.stringify(this.productos, null, '\t'));
    }




    getById(id) {
        (async () => {
            try {
                let response = await knex.from("productos").where("id", "=", id);
                console.table(response);
                // const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
                // const conversion = JSON.parse(resultado)
                // const buscado = conversion.find(c => c.id == id);
                // if (!buscado) {
                //     res.status(404);
                //     res.json({ mensaje: `no se encontrĂ³ producto con ese id (${id})` });
                // } else {
                //     res.json(buscado);
                // }
            }
            catch (err) {
                // res.status(404);
                console.log(err);
            }
        })
            ()
    }

    // postProductos() {
    //     (async () => {
    //         const modificacion = req.body;
    //         const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
    //         const productos = JSON.parse(resultado)
    //         let resultadoNuevo = { ...modificacion, id: Date.now(), timestamp: new Date().toLocaleDateString() }
    //         productos.push(resultadoNuevo)
    //         await fs.promises.writeFile('./productos.txt', JSON.stringify(productos, null, '\t'))
    //         res.redirect('/productos')
    //     })
    //         ();

    // };

    putProductos(id, body) {
        (async () => {
            // let { id } = req.params;
            await knex.from("productos").where("id", "=", id).update(body);
            console.log("Producto Modificado !!!");
            // const modificacion = req.body;
            // const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
            // const conversion = JSON.parse(resultado)
            // const buscado = conversion.find(c => c.id == id);
            // if (!buscado) {
            //     res.status(404);
            //     res.send("Error, el producto no existe")
            // } else {
            //     let nuevoProducto = { ...modificacion, id: id }
            //     conversion.splice(buscado.id - 1, 1, nuevoProducto)
            //     await fs.promises.writeFile('./productos.txt', JSON.stringify(conversion, null, '\t'))
            //     res.json(conversion)
            // }
        })();
    }


    deleteProducto(productoId) {
        (async () => {
            try {
                
                await knex.from("productos").where("id", "=", productoId).del();
            } catch (error) {
                console.log(error);
            }
            // let { id } = req.params;
            // const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
            // const conversion = JSON.parse(resultado)
            // const buscado = conversion.find(c => c.id == id);            
            // if (!buscado) {
            //     res.status(404);
            //     res.send("Error, el producto no existe")
            // } else {
            //     const filtrado = conversion.filter((item) => item !== buscado)
            //     await fs.promises.writeFile('./productos.txt', JSON.stringify(filtrado, null, '\t'))
            //     res.json(filtrado)
            // }
        })
            ();
    }
}


module.exports = Producto;
// exports.getById = getById;
// exports.postProductos = postProductos;
// exports.putProductos = putProductos;
// exports.deleteProducto = deleteProducto;