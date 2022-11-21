class Producto {
    constructor (){
        this.productos = [];
    }

    listar(){
        if (this.productos.length === 0){
            return {error: "No hay productos cargados"};
        }
        else{
            return this.productos;
        }
    }
    
    listar_id(productoId){
        let producto = this.productos.find(element => element.id === parseInt(productoId));
        if (producto){
            return(producto);
        } else {
            return {error: "Producto no encontrado."};
        }
    }

    agregar(producto){
        let objeto = {...producto, 
                        id: this.productos.length + 1}
        this.productos.push(objeto);
        return objeto;
    }

    update(productoId, body){
        let producto = this.productos.find(element => element.id === parseInt(productoId));
        if (producto){
            this.productos[productoId-1] = {...body, id: parseInt(productoId)};
            return this.productos[productoId-1];
        } else {
            return {error: "Producto a actualizar no encontrado."};
        } 
    }

    borrar(productoId){
        let producto = this.productos.find(element => element.id === parseInt(productoId));
        if (producto){
            let productoEliminado = this.productos[productoId-1];
            this.productos.splice(productoId-1, 1);
            return productoEliminado;
        } else {
            return {error: "Producto a borrar no encontrado."};
        }
    }

}

module.exports = Producto;

// const fs = require('fs')

// export default class ContenedorProducts {

//     constructor(id, name, description, image, price) {

//         this.name = name
//         this.description = description
//         this.image = image
//         this.price = price
//     }

//     getAll(req, res) {
//         (async () => {
//             try {
//                 const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
//                 const conversion = JSON.parse(resultado)
//                 res.json(conversion)
//             }
//             catch (error) {
//                 res.json("No se encontró el archivo", error)
//             }
//         })
//             ()
//     }

//     getById({ params: { id } }, res) {
//         (async () => {
//             try {
//                 const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
//                 const conversion = JSON.parse(resultado)
//                 const buscado = conversion.find(c => c.id == id);
//                 if (!buscado) {
//                     res.status(404);
//                     res.json({ mensaje: `no se encontró producto con ese id (${id})` });
//                 } else {
//                     res.json(buscado);
//                 }
//             }
//             catch (err) {
//                 res.status(404);
//             }
//         })
//             ()
//     }

//     postProductos(req, res) {
//         (async () => {
            
//             const modificacion = req.body;
//             const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
//             const conversion = JSON.parse(resultado)
//             let resultadoNuevo = { ...modificacion, id: Date.now(), timestamp: new Date().toLocaleDateString() }
//             conversion.push(resultadoNuevo)
//             await fs.promises.writeFile('./productos.txt', JSON.stringify(conversion, null, '\t'))
//             res.json(conversion)
//         })
//             ();
    
//     };

    // putProductos(req, res) {
    //     (async () => {
    //         let { id } = req.params;
    //         const modificacion = req.body;
    //         const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
    //         const conversion = JSON.parse(resultado)
    //         const buscado = conversion.find(c => c.id == id);
    //         if (!buscado) {
    //             res.status(404);
    //             res.send("Error, el producto no existe")
    //         } else {
    //             let nuevoProducto = { ...modificacion, id: id }
    //             conversion.splice(buscado.id - 1, 1, nuevoProducto)
    //             await fs.promises.writeFile('./productos.txt', JSON.stringify(conversion, null, '\t'))
    //             res.json(conversion)
    //         }
    //     })();
    // }

//     deleteProducto(req, res) {
//         (async () => {
//             let { id } = req.params;
//             const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
//             const conversion = JSON.parse(resultado)
//             const buscado = conversion.find(c => c.id == id);
//             if (!buscado) {
//                 res.status(404);
//                 res.send("Error, el producto no existe")
//             } else {
//                 const filtrado = conversion.filter((item) => item !== buscado)
//                 await fs.promises.writeFile('./productos.txt', JSON.stringify(filtrado, null, '\t'))
//                 res.json(filtrado)
//             }
//         })
//             ();
//     }
// }
