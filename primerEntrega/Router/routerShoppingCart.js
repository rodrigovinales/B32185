import { Router } from 'express'
import * as cart from '../Api/apiShoppingCart.js'
export const routerShoppingCart = Router()

// POST: '/' - Crea un carrito (con una lista vacía de productos) y devuelve su id.
routerShoppingCart.post('/shoppingcart/', (req, res) => {
    let carto = cart.postInicial();
    res.json(`Id del Cart: ${carto[0].id}`);
})

// DELETE: '/:id_carrito' - Vacía un carrito (borra sus productos, no borra el carrito!).
routerShoppingCart.delete('/shoppingcart/:id_carrito', (req, res) => {
    let response = cart.deleteCartId(req.params.id_carrito);
    res.json(response);
})

// POST: '/:id_cart/products' - Para incorporar productos al carrito, enviando el id de producto en el cuerpo de la petición.
routerShoppingCart.post('/shoppingcart/:id_cart/products', (req, res) => {
    let respuesta = cart.postCartProducts(req.body, req.params.id_cart);
    res.json(respuesta)
})

// GET: '/:id_cart/products' - Me permite listar todos los productos guardados en el carrito
routerShoppingCart.get('/shoppingcart/:id_cart/products', async (req, res) => {
    let respuesta = await cart.listar(req.body, req.params.id_cart);
    res.json(respuesta);
})


//DELETE: '/:id_cart/products/:id_prod' - Eliminar una aparición del producto del carrito por su id de carrito y de producto.
routerShoppingCart.delete('/shoppingcart/:id_cart/products/:id_prod', (req, res) => {
    let response = cart.deleteCartIdProductId(req.params.id_cart, req.params.id_prod);
    res.json(response);
})

