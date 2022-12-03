## _Clase 9 Mongo_

Iniciamos mongo desde consola, en mi caso utilizando consola de Windows CMD.

## Punto 2 - _Definicion de Claves y valores_
Se genera un productos.JSON solamente para cargar los datos, y poder ingresarlos utilizando el comando db.productos.insertMany, ya que son varios productos a ingresar. Idem con mensajes.JSON

## _Creacion de BD_
se utiliza el comando use ecommerce (Al no existir, la crea)
comando utilizado: `use ecommerce`

## Punto 1 - _Creacion de Collections_
Creamos colecciones productos y mensajes. 
comando utilizado: `db.productos.insertMany([ {
        "id": 1,
        "title": "Teclado",
        "price": 120
    },
    {
        "id": 2,
        "title": "Mouse",
        "price": 580
    },
    {
        "id": 3,
        "title": "Router",
        "price": 900
    },
    {
        "id": 4,
        "title": "Celular",
        "price": 1280
    },
    {
        "id": 5,
        "title": "Monitor",
        "price": 1700
    },
    {
        "id": 6,
        "title": "DiscoRigido",
        "price": 2300
    },
    {
        "id": 7,
        "title": "MemoriaRam",
        "price": 2860
    },
    {
        "id": 8,
        "title": "Impresora",
        "price": 3350
    },
    {
        "id": 9,
        "title": "Parlantes",
        "price": 4320
    },
    {
        "id": 10,
        "title": "Auriculares",
        "price": 4990
    } ])` para productos.

comando utilizado: `db.mensajes.insertMany([ {
		"author": "Admin",
		"text": "Bienvenidos",
		"date": "03/12/2022 18:24:12"
	},
    {
		"author": "Visitante1",
		"text": "Hola como van",
		"date": "03/12/2022 18:24:14"
	},
    {
		"author": "Visitante3",
		"text": "Aca estamos",
		"date": "03/12/2022 18:24:20"
	},
    {
		"author": "Visitante4",
		"text": "Todavia luchando con sql chicos?",
		"date": "03/12/2022 18:24:25"
	},
    {
		"author": "Visitante5",
		"text": "Aca renegando con el primer desafio, no molestes",
		"date": "03/12/2022 18:24:36"
	},
	{
		"author": "Admin",
		"text": "Bienvenidos de nuevo, payasos",
		"date": "03/12/2022 18:25:02"
	},
    {
		"author": "Visitante1",
		"text": "Otra vez? estoy viendo el partido",
		"date": "03/12/2022 18:25:15"
	},
    {
		"author": "Visitante2",
		"text": "no molesten que voy a apagar la compu",
		"date": "03/12/2022 18:26:00"
	},
    {
		"author": "Visitante4",
		"text": "Todavia luchando con sql chicos?",
		"date": "03/12/2022 18:26:39"
	},
    {
		"author": "Visitante5",
		"text": "De nuevo preguntas lo mismo???",
		"date": "03/12/2022 18:26:42"
	} ])` para mensajes.

## Punto 3 - _Comprobacion de contenido de ambas colecciones_
Comprobamos que fueron insertados correctamente utilizando `db.productos.find()`, la cual me pinta en pantalla los valores ingresados y su _ID unico.
Idem punto anterior para `db.mensajes.find()`.

## Punto 4 - _Mostramos la cantidad de documentos de cada coleccion_.
Utilizamos `db.productos.countDocuments()` y nos muestra en este caso, numero 10.
Idem `db.mensajes.countDocuments()` para mensajes.

## _Punto 5 - CRUD._
### a) Utilizamos, en este caso, db.productos.insertOne({"title": "ProductoIngresadoporConsola"}) y comprobamos su ingreso correcto.
### b)
```sh
    i) db.productos.find({"price": {$lt: 1000}})
    ii) db.productos.find({$and:[{"price": {$gt :1000}}, {"price":{$lt: 3000}}])
    iii) db.productos.find({"price": {$gt: 3000}})
    iv) db.productos.find({},{"title":1, "_id":0}).sort({price: 1}).skip(2).limit(1)    
c) db.productos.updateMany({} , {$set: {"stock": 100}}, {upsert:true})
d) db.productos.updateMany({"price": {$gt: 4000}},{$set: {"stock": 0}})
e) db.productos.deleteMany({"price": {$lt: 1000}})
```


## _Punto 6 - Creacion de Usuarios_
Utilizamos segun lo requerido en el desafio.

```sh
db.createUser({"user": "pepe", "pwd": "asd456", roles:[{role: "read", db: "ecommerce"}]})
```

Comprobamos efectivamente mediante consola iniciando el usuario con:
- mongo -u pepe -p asd456

Y comprobamos que no permite Escritura, solamente Escritura. Logrando asi la efectividad de la creacion y permisos del usuario.

