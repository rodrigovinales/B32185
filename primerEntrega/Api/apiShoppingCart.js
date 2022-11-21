import crypto from 'crypto'
// import Producto from '../Contenedor/contenedorProducts.js';
import fs from 'fs'

// const producto = new Producto();

/* El carrito de compras tendrá la siguiente estructura:
{ id, productos: [ { id, name, description, image (url), price } ] } */

export function postInicial() {
    let cart = []
    let productos = [{ "id": "", "name": "", "description": "", "image": "", "price": "" }]
    const resultado = fs.readFileSync('./cart.txt', 'utf-8')
    const conversion = JSON.parse(resultado)
    let resultadoNuevo = { id: crypto.randomUUID(), productos }
    cart.push(resultadoNuevo, ...conversion)
    fs.writeFileSync('./cart.txt', JSON.stringify(cart, null, '\t'))
    return cart;
};

// export function postInicial() {
//     let productos = [{ "id": "", "name": "", "description": "", "image": "", "price": "" }]
//     const cart = [{ id: crypto.randomUUID(), productos }]
//     fs.writeFileSync('./cart.txt', JSON.stringify(cart, null, '\t'))
//     return cart;
// };

export function deleteCartId(req, res) {
    let productos = [{ "id": "", "name": "", "description": "", "image": "", "price": "" }]
    const resultado = fs.readFileSync('./cart.txt', 'utf-8')
    const conversion = JSON.parse(resultado)
    const buscado = conversion.find(c => c.id == req);
    if (!buscado) {
        return ({ mensaje: `no se encontró carrito con ese id (${req})` });
    } else {
        const filtrado = [{ id: conversion[0].id, productos }]
        fs.writeFileSync('./cart.txt', JSON.stringify(filtrado, null, '\t'))
        return filtrado
    }
}

// POST: '/:id_cart/products' - Para incorporar productos al carrito, enviando el id de producto en el cuerpo de la petición.

export function postCartProducts(req, res) {
    const resultadoProducts = fs.readFileSync('./productos.txt', 'utf-8')
    const conversionProducts = JSON.parse(resultadoProducts)
    const resultadoCart = fs.readFileSync('./cart.txt', 'utf-8')
    const conversionCart = JSON.parse(resultadoCart)
    let newCart = []
    const buscado = conversionCart.find(c => c.id == res);
    if (buscado) {
        newCart.push({ id: res, productos: conversionProducts, ...conversionCart })
        fs.writeFileSync('./cart.txt', JSON.stringify(newCart, null, '\t'))
        return newCart
    } else {
        return ({ mensaje: `no se encontró producto con ese id (${res})` });
    }
};


// GET: '/:id_cart/products' - Me permite listar todos los productos guardados en el carrito
export function listar(req, res) {
    try {
        const resultado = fs.readFileSync('./cart.txt', 'utf-8')
        const conversion = JSON.parse(resultado)
        const buscado = conversion.find(c => c.id == res);
        if (!buscado) {
            return ({ mensaje: `no se encontró carrito con ese id (${res})` });
        } else {
            return buscado
        }
    }
    catch (error) {
        return ("No se encontró el archivo", error)
    }
}

//DELETE: '/:id_cart/products/:id_prod' - Eliminar una aparición del producto del carrito por su id de carrito y de producto.

export function deleteCartIdProductId(req, res) {
    let firstArray = []
    let secondArray = []
    let idSearch = res;
    const resultadoCart = fs.readFileSync('./cart.txt', 'utf-8')
    const conversionCart = JSON.parse(resultadoCart)
    const searchCart = conversionCart.find(c => c.id == req);
    if (!searchCart) {
        return ({ mensaje: `no se encontró carrito con ese id (${req})` });
    } else {
        firstArray = conversionCart.map(e => {
            secondArray = e.productos.map(i => {
                if (idSearch === i.id) {
                    const filtradoProd = e.productos.filter((item) => item.id !== i.id)
                    const nuevoProd = [{ id: conversionCart[0].id, productos: filtradoProd }]
                    fs.writeFileSync('./cart.txt', JSON.stringify(nuevoProd, null, '\t'))
                    // console.log(nuevoProd)
                    return nuevoProd
                }
                else {
                    return ({ mensaje: `no se encontró Producto con ese id (${res})` });
                }
            })
        })
    }
}





