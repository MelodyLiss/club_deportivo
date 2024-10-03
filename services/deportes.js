const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

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

    catch (error) {
        console.log(error);
        return {
            msg: "NO HAY DEPORTES REGISTRADOS",
            deportes: []
        }
    }
};

const findByIdDeportes = async (id) => {
    try {
        const datos = await fs.readFile('./data/deportes.json', 'utf8');
        const deportes = JSON.parse(datos);
        const deportesById = deportes.filter((dato) => {
            return dato.id == id;
        });



        if (deportes.length == 0) {
            return {
                msg: `No existe deporte asociado a ese ${id}`,
                deportes
            }
        } return {
            msg: `El deporte asociado al ${id} es :`,
            deportes: deportesById
        }
    }

    catch (error) {
        console.log(error);
        return {
            msg: "Error en el servidor",
            deportes: []
        }
    }
}

const insertDeportes = async (nombre, precio) => {
    try {
        const id = uuidv4()
        const datos = await fs.readFile('./data/deportes.json', 'utf8');
        const deportes = JSON.parse(datos);
        deportes.push({
            id,
            nombre,
            precio
        });
        fs.writeFile('./data/deportes.json', JSON.stringify(deportes))

        return {
            msg: `Deporte insertado correctamente`,
            deportes
        }
    }

    catch (error) {
        console.log(error);
        return {
            msg: "Error en el servidor",
            deportes: []
        }

    }
}

const updateFromIdDeportes = async (id, nombre, precio) => {
    try {
        const datos = await fs.readFile('./data/deportes.json', 'utf8');
        const deportes = JSON.parse(datos);
        const deporteActualizar = deportes.find((dato) => {
            return dato.id == id;
        })
        if (deporteActualizar) {
            if (nombre) {
                deporteActualizar.nombre = nombre;
            } if (precio) {
                deporteActualizar.precio = precio;
            }
            fs.writeFile('./data/deportes.json', JSON.stringify(deportes))
            return {
                msg: `El deporte con id ${id} se actualizó`,
                deportes
            }
        }
        return {
            msg: `El deporte con id ${id} no existe para actualizar`,
            deportes
        }
    }
    catch (error) {
        console.log(error);
        return {
            msg: "Error en el servidor",
            deportes: []
        }
    }
}

const deletebyIdDeportes = async (id) => {
    try {
        const datos = await fs.readFile('./data/deportes.json', 'utf8');
        const deportes = JSON.parse(datos);
        const deporteById = deportes.filter((dato) => {
            return dato.id == id;
        });
        if (deporteById.length == 0) {
            return {
                msg: `No existe deporte asociado a ese ${id}`,
                deportes
            }
        }
        const deportesNuevos = deportes.filter((dato) => {
            return dato.id != id;
        })
        fs.writeFile('./data/deportes.json', JSON.stringify(deportesNuevos));
        return {
            msg: `El deporte con id ${id} se eliminó correctamente`,
            deportes: deportesNuevos
        }
    } catch (error) {
        console.log(error);
        return {
            msg: `Error en el servidor`,
            deportes: []
        }
    }
}


    module.exports = {
        findAllDeportes,
        findByIdDeportes,
        insertDeportes,
        updateFromIdDeportes,
        deletebyIdDeportes
    }