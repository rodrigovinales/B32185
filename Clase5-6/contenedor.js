const fs = require("fs");
let productos = [];
let archivo = ("./productos.txt")

const producto1 = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}

const producto2 = {
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
}

const producto3 = {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
}

const producto4 = {
    title: 'Bandera de colores',
    price: 2300,
    thumbnail: 'https://www.shutterstock.com/es/image-vector/vector-set-national-flag-mauritius-various-1786374875'
}

const producto5 = {
    title: 'Corazones con banderas',
    price: 3690,
    thumbnail: 'https://www.shutterstock.com/es/image-vector/espana-spain-flag-different-countries-flags-1380451250'
}


class Contenedor {
   
    constructor(title, price, thumbnail) {

        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }

    async save(producto) {
        try {
            producto['id'] = productos.length + 1;
            productos.push(producto)
            await fs.promises.writeFile(archivo, JSON.stringify(productos, null, '\t'))
        }
        catch (err) {
            console.log(err)
        }
    }

    async getById(id) {
        try {
            const resultado = await fs.promises.readFile(archivo, 'utf-8')
            const conversion = JSON.parse(resultado)
            conversion.forEach(element => {
                if (id == element.id) {
                    console.log("El id elegido corresponde a ", element)
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    async getAll() {
        try {
            const resultado = await fs.promises.readFile(archivo, 'utf-8')
            return (JSON.parse(resultado));
        }
        catch (error) {
            console.log("No se encontró el archivo")
        }
    }

    async deleteById(id) {
        try {
            const resultado = await fs.promises.readFile(archivo, 'utf-8')
            const conversion = JSON.parse(resultado)
            let Array = conversion.filter((item) => item.id !== id);
            fs.promises.writeFile(archivo, JSON.stringify(Array, null, '\t'))
        }
        catch (err) {
            console.log(err)
        }
    }

    async DeleteAll() {
        try {
            fs.unlink(archivo, error => {
                if (error) {
                    console.log('No se pudo borrar el archivo, el mismo no se encuentra en', error.path)
                }
                else {
                    console.log('Borrado correcto')
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

async function testeo() {
    
    // await misProductos.save(producto1)
    // await misProductos.save(producto2)
    // await misProductos.save(producto3)
    // await misProductos.save(producto4)
    // await misProductos.save(producto5)
    
    
    // await misProductos.getById(4)
    // console.log("MOSTRAMOS TODOS LOS PRODUCTOS", await misProductos.getAll())
    // await misProductos.deleteById(1)
    // await misProductos.DeleteAll()
    
    
}
const misProductos = new Contenedor(archivo);

testeo()

module.exports = Contenedor;
