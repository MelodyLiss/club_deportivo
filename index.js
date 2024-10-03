const Server = require("./models/server");
const server = new Server();


const {findAllDeportes} = require("./services/deportes.js")

server.listen();

findAllDeportes().then(datos => {
    console.log(datos); 
})

