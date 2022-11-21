import crypto from 'crypto'
// import Producto from '../Contenedor/contenedorProducts.js';
import fs from 'fs'

// const producto = new Producto();

export function listar() {
    try {
        const resultado = fs.readFileSync('./productos.txt', 'utf-8')
        const conversion = JSON.parse(resultado)
        return conversion
    }
    catch (error) {
        return ("No se encontró el archivo", error)
    }
}

export function listar_id(productoId) {

    const resultado = fs.readFileSync('./productos.txt', 'utf-8')
    const conversion = JSON.parse(resultado)
    const buscado = conversion.find(c => c.id == productoId);
    if (!buscado) {
        return ({ mensaje: `no se encontró producto con ese id (${productoId})` });
    } else {
        return buscado;
    }
}

export function postProductos(req, res) {
    const resultado = fs.readFileSync('./productos.txt', 'utf-8')
    const conversion = JSON.parse(resultado)
    let resultadoNuevo = { ...req, id: crypto.randomUUID() }
    conversion.push(resultadoNuevo)
    fs.writeFileSync('./productos.txt', JSON.stringify(conversion, null, '\t'))
    return conversion
};

export function putProductos(req, res) {
    // let id = req;
    // const modificacion = res;
    const resultado = fs.readFileSync('./productos.txt', 'utf-8')
    const conversion = JSON.parse(resultado)
    const buscado = conversion.find(c => c.id == req);
    if (!buscado) {
        return ({ mensaje: `no se encontró producto con ese id (${req})` });
    } else {
        let nuevoProducto = { ...res, id: req }
        conversion.splice(buscado.id, 1, nuevoProducto)
        fs.writeFileSync('./productos.txt', JSON.stringify(conversion, null, '\t'))
        return conversion
    }
}

export function deleteProductoId(req, res) {
    
        let id  = req;
        const resultado = fs.readFileSync('./productos.txt', 'utf-8')
        const conversion = JSON.parse(resultado)
        const buscado = conversion.find(c => c.id == id);
        if (!buscado) {
            return ({ mensaje: `no se encontró producto con ese id (${req})` });
        } else {
            const filtrado = conversion.filter((item) => item !== buscado)
             fs.writeFileSync('./productos.txt', JSON.stringify(filtrado, null, '\t'))
            return filtrado
        }
    
}




