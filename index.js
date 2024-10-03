const Server = require("./models/server");
const server = new Server();


const {findAllDeportes,
    findByIdDeportes,
    insertDeportes,
    updateFromIdDeportes,
    deletebyIdDeportes} = require("./services/deportes.js")

server.listen();

//!Pruebas de cada metodo de la capa services

// findAllDeportes().then(datos => {
//     console.log(datos); 
// })

// findByIdDeportes(2).then(datos =>{
//     console.log(datos);
// })

// insertDeportes('ajezdres', 69000);

updateFromIdDeportes(1, "natacion", 45666)