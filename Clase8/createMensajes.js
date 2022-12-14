const { mariaDB } = require("./database/mariaDB")
const knex = require("knex")(mariaDB)

knex.schema.createTable("mensajes", table => {
    table.increments("id")
    table.string("author")
    table.string("text")
    table.string("date")
})
    .then(() => console.log("Tabla Creada con Exito"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    })

