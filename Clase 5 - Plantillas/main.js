const { conectar } = require("./server");
const PORT = 8080

async function main() {
    try {
        const server = await conectar(PORT);
        console.log(`Server activo en http://localhost:${server.address().port}`);
    } catch (error) {
        console.log('algo falló: ' + error);
    }
}


main()