const fs = require('node:fs/promises');
const { v4: uuidv4 } = require('uuid');

const findAll = async () => {
    try {
        const datos = await fs.readFile('./data/deportes.json', { encoding: 'utf8' });
        const deportes = JSON.parse(datos);
        if (deportes.length == 0) {
            return {
                msg: `No hay deportes`,
                deportes
            }
        }
        return {
            msg: `El listado de deportes es: `,
            deportes
        }
    } catch (error) {
        console.log(error);
        return {
            msg: `Error en el servidor`,
            deportes: []
        }
    }

}

const findById = async (id) => {
    try {
        const datos = await fs.readFile('./data/deportes.json', { encoding: 'utf8' });
        const deportes = JSON.parse(datos);
        const deporteFiltrado = deportes.filter((deporteTemporal) => {
            return deporteTemporal.id == id;
        });
        if (deporteFiltrado.length == 0) {
            return {
                msg: `El deporte con id ${id} no existe`,
                deportes
            }
        }
        return {
            msg: `El deporte con id ${id} es:`,
            deportes: deporteFiltrado
        }
    } catch (error) {
        console.log(error);
        return {
            msg: `Error en el servidor`,
            deportes: []
        }
    }
}

const insert = async (nombre, precio) => {
    try {
        const id = uuidv4();
        const datos = await fs.readFile('./data/deportes.json', { encoding: 'utf8' });
        const deportes = JSON.parse(datos);
        deportes.push({
            id,
            nombre,
            precio
        });
        await fs.writeFile('./data/deportes.json', JSON.stringify(deportes));
        return {
            msg: `Deporte insertado correctamente`,
            deportes
        }
    } catch (error) {
        console.log(error);
        return {
            msg: `Error en el servidor`,
            deportes: []
        }
    }

}

const update = async (id, nombre, precio) => {
    try {
        const datos = await fs.readFile('./data/deportes.json', { encoding: 'utf8' });
        const deportes = JSON.parse(datos);
        const deporteActualizar = deportes.find((deporteTemporal) => {
            return deporteTemporal.id == id;
        });
        if (deporteActualizar) {
            if (nombre) {
                deporteActualizar.nombre = nombre;
            }
            if (precio) {
                deporteActualizar.precio = precio;
            }
            fs.writeFile('./data/deportes.json', JSON.stringify(deportes));
            return {
                msg: `El deporte con id ${id} se actualizó`,
                deportes
            }
        }
        return {
            msg: `El deporte con id ${id} no existe para actualizar`,
            deportes
        }
    } catch (error) {
        console.log(error);
        return {
            msg: `Error en el servidor`,
            deportes: []
        }
    }
}

const deleteById = async (id) => {
    try {
        const datos = await fs.readFile('./data/deportes.json', { encoding: 'utf8' });
        const deportes = JSON.parse(datos);
        const deporteFiltrado = deportes.filter((deporteTemporal) => {
            return deporteTemporal.id == id;
        });
        if (deporteFiltrado.length == 0) {
            return {
                msg: `El deporte con id ${id} no existe`,
                deportes
            }
        }
        const deportesNuevos = deportes.filter((deporteTemporal) => {
            return deporteTemporal.id != id;
        });
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
    findAll,
    findById,
    insert,
    update,
    deleteById
}