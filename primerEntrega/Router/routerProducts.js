import { Router } from 'express'
import * as producto from '../Api/apiProducts.js'
export const routerProducts = Router()

let esAdmin = true

let noAdmin = "NO ESTAS AUTORIZADO"

// GET /api/productos/listar me devuelve todos los productos
routerProducts.get('/products/', async (req, res) => {
    let respuesta = await producto.listar(req.body);
    res.json(respuesta);
})

routerProducts.get('/products/:id', async (req, res) => {
    let respuesta = await producto.listar_id(req.params.id);
    res.json(respuesta);
})


routerProducts.post('/products/', (req, res) => {
    if (esAdmin) {
        producto.postProductos(req.body);
        res.json(req.body);
    }
    else {
        res.json(noAdmin)
    }
})

routerProducts.put('/products/:id', (req, res) => {
    if (esAdmin) {
        let response = producto.putProductos(req.params.id, req.body);
        res.json(response);
    }
    else {
        res.json(noAdmin)
    }
})

routerProducts.delete('/products/:id', (req, res) => {
    if (esAdmin) {
        let response = producto.deleteProductoId(req.params.id);
        res.json(response);
    }
    else {
        res.json(noAdmin)
    }
})
