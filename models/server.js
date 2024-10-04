const express = require('express');

class Server{

    constructor(){
        this._app = express();
        this._port = 3000;
        this.routers();
        this.middlewares()
    };

    middlewares(){
        this._app.set('view engine', 'hbs'); 
        this._app.use(express.urlencoded({extended:true}));
    }

    routers(){
        this._app.use('/deportes',require('../routers/rutas.js'));
    }

    listen() {
        const reset = "\x1b[0m";         
        const Colorlog = "\x1b[45m"; 

    
        this._app.listen(this._port, () => {
            console.log(`${Colorlog} Servidor inicializado en el puerto ${this._port}  ${reset}`);
        });
    }

}

module.exports = Server;