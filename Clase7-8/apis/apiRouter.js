const express = require('express')
const { getAll, getById, postProductos, putProductos, deleteProducto } = require("../controlador/controlador.js")
const apiRouter = express.Router();

apiRouter.get('/', getAll);
apiRouter.get('/:id', getById);
apiRouter.post('/', postProductos);
apiRouter.put('/:id', putProductos);
apiRouter.delete('/:id', deleteProducto)

exports.apiRouter = apiRouter;