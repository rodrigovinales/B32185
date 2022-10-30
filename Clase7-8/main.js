const { conectar } = require("./server");
const PORT = 8080

async function main() {
    try {
        const server = await conectar(PORT);
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
    } catch (error) {
        console.log('algo falló: ' + error);
    }
}


main()