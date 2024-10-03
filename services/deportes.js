const { log } = require('console');
const fs = require('fs/promises');
const uuid = require('uuid');

//mostrar todos los deportes con fs
const findAllDeportes = async () => {

    try {
        const datos = await fs.readFile('./data/deportes.json', 'utf8');
        const deportes = JSON.parse(datos);

        if (deportes.length == 0) {
            return {
                msg: "NO HAY DEPORTES REGISTRADOS",
                deportes
            }
        } return {
            msg: "Listado actual de deportes",
            deportes
        }
    }

    catch (error){
        console.log(error);
        return {
            msg: "NO HAY DEPORTES REGISTRADOS",
            deportes:[]
        }

    }


};

const findByIdDeportes = (id) => {
}

const insertDeportes = (nombre, precio) => {
}

const updateFromIdDeportes = (id, nombre, precio) => {
}

const deletebyIdDeportes = (id) => {
}


module.exports = {
    findAllDeportes,
    findByIdDeportes,
    insertDeportes,
    updateFromIdDeportes,
    deletebyIdDeportes
}