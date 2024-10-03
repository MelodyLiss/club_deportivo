const express = require('express');

class Server{

    constructor(){
        this._app = express();
        this._port = 4000;
    }

    listen() {
        const reset = "\x1b[0m";         
        const Colorlog = "\x1b[45m"; 

    
        this._app.listen(3000, () => {
            console.log(`${Colorlog} Servidor inicializado en el puerto 3000  ${reset}`);
        });
    }

}

module.exports = Server;