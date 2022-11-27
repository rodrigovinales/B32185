const express = require ('express');
const routerProductos = express.Router();

const Producto = require ('../apis/apiProducto')

const producto = new Producto();


routerProductos.get('/productos/', (req, res)=>{
    let respuesta = producto.getAllProductos();
    res.json(respuesta);
})


routerProductos.get('/productos/:id', (req,res)=>{
    let response = producto.getById(req.params.id);
    res.json(response)
})


routerProductos.post('/productos/guardar', (req, res)=>{
    let productoAgregar = req.body;
    let respuesta = producto.guardarProducto(productoAgregar);
    res.redirect('/');
})

routerProductos.delete('/productos/:id', (req, res) => {
    let response = producto.deleteProducto(req.params.id);
    res.json(response);
})

routerProductos.put('/productos/:id', (req, res)=> {
    let response = producto.putProductos(req.params.id, req.body);
    res.json(response);
})

module.exports = {routerProductos, producto};