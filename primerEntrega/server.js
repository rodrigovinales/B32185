// const express = require('express')
import express from 'express'
const app = express()
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
import { routerProducts } from './Router/routerProducts.js'
import { routerShoppingCart } from './Router/routerShoppingCart.js'

app.use('/api', routerProducts)
app.use('/api', routerShoppingCart)
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.send('index');
});

app.all('*', (req, res) => {
    res.status(404).json(/*no implementada!*/)
})

app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algun ingreso fue incorrecto');
});




/////////////////////// PORT /////////////////////////
const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

server.on('error', ()=>{
    console.log('Ocurrio un error.');
})