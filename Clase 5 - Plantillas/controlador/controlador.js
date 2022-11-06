const fs = require('fs')

function getAll(req, res) {
    (async () => {
        try {
            const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
            const productos = JSON.parse(resultado)
            res.render('productos', { productos, hayProductos: productos.length > 0 })
        }
        catch (error) {
            res.json("No se encontró el archivo", error)
        }
    })
        ()
}

function getById({ params: { id } }, res) {
    (async () => {
        try {
            const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
            const conversion = JSON.parse(resultado)
            const buscado = conversion.find(c => c.id == id);
            if (!buscado) {
                res.status(404);
                res.json({ mensaje: `no se encontró producto con ese id (${id})` });
            } else {
                res.json(buscado);
            }
        }
        catch (err) {
            res.status(404);
        }
    })
        ()
}

function postProductos(req, res) {
    (async () => {
        const modificacion = req.body;
        const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
        const productos = JSON.parse(resultado)
        let resultadoNuevo = { ...modificacion, id: Date.now(), timestamp: new Date().toLocaleDateString() }
        productos.push(resultadoNuevo)
        await fs.promises.writeFile('./productos.txt', JSON.stringify(productos, null, '\t'))
        res.redirect('/productos')
    })
        ();

};

function putProductos(req, res) {
    (async () => {
        let { id } = req.params;
        const modificacion = req.body;
        const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
        const conversion = JSON.parse(resultado)
        const buscado = conversion.find(c => c.id == id);
        if (!buscado) {
            res.status(404);
            res.send("Error, el producto no existe")
        } else {
            let nuevoProducto = { ...modificacion, id: id }
            conversion.splice(buscado.id - 1, 1, nuevoProducto)
            await fs.promises.writeFile('./productos.txt', JSON.stringify(conversion, null, '\t'))
            res.json(conversion)
        }
    })();
}


function deleteProducto(req, res) {
    (async () => {
        let { id } = req.params;
        const resultado = await fs.promises.readFile('./productos.txt', 'utf-8')
        const conversion = JSON.parse(resultado)
        const buscado = conversion.find(c => c.id == id);
        if (!buscado) {
            res.status(404);
            res.send("Error, el producto no existe")
        } else {
            const filtrado = conversion.filter((item) => item !== buscado)
            await fs.promises.writeFile('./productos.txt', JSON.stringify(filtrado, null, '\t'))
            res.json(filtrado)
        }
    })
        ();
}


exports.getAll = getAll;
exports.getById = getById;
exports.postProductos = postProductos;
exports.putProductos = putProductos;
exports.deleteProducto = deleteProducto;