const express = require('express')
const { getAll, getById, postProductos, putProductos, deleteProducto } = require("../controlador/controlador.js")
const apiRouter = express.Router();

apiRouter.get('/productos', getAll);
// apiRouter.get('/:id', getById);
apiRouter.post('/productos', postProductos);
// apiRouter.put('/:id', putProductos);
// apiRouter.delete('/:id', deleteProducto)

exports.apiRouter = apiRouter;