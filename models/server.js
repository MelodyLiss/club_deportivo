const express = require('express');
const hbs = require('hbs');
const path = require('path');


class Server{

    constructor(){
        this._app = express();
        this._port = 3000;
        this.middlewares();
        this.routers();

    };

    middlewares(){
        this._app.set('view engine', 'hbs'); 
        this._app.use(express.json());
        hbs.registerPartials(path.join(__dirname, '../views/partials'));
        this._app.use(express.urlencoded({extended:true}));
        this._app.use(express.static('public'));


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