const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const findAllDeportes = async () => {
    try {
        const datos = await fs.readFile('./data/deportes.json', 'utf8');
        const deportes = JSON.parse(datos);

        //<> Para ordenarlos alfabeticamente
        deportes.sort((a, b) => {
            if (a.nombre < b.nombre) return -1; // a va antes que b
            if (a.nombre > b.nombre) return 1;  // a va después que b
            return 0;                             // son iguales
        });

        if (deportes.length === 0) {
            return {
                msg: "NO HAY DEPORTES REGISTRADOS",
                deportes
            };
        }
        
        return {
            deportes
        };
    } catch (error) {
        console.log(error);
        return {
            msg: "NO HAY DEPORTES REGISTRADOS",
            deportes: []
        };
    }
};


const findByIdDeportes = async (id) => {
    try {
        const datos = await fs.readFile('./data/deportes.json', 'utf8');
        const deportes = JSON.parse(datos);
        const deportesById = deportes.filter((dato) => dato.id == id);

        
        if (deportesById.length === 0) {
            return {
                msg: `No existe deporte asociado a ese ID: ${id}`,
                deportes,  
                isError: true
            };
        }

        return {
            msg: `Deporte con id ${id} encontrado correctamente`,
            deportes: deportesById,  
        };
    } catch (error) {
        console.log(error);
        return {
            msg: "Error en el servidor",
            deportes: [],
            isError: true
        };
    }
};


const insertDeportes = async (nombre, precio) => {
    try {
        
        const id = uuidv4().split('-').join('').substring(0, 8); //.plit para eliminar , join para juntar
        const datos = await fs.readFile('./data/deportes.json', 'utf8');
        const deportes = JSON.parse(datos);
        deportes.push({
            id,
            nombre,
            precio,
        });
        await fs.writeFile('./data/deportes.json', JSON.stringify(deportes, null, 2));

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
        const deporteActualizar = deportes.find((dato) => dato.id == id);

        if (deporteActualizar) {
            if (nombre) {
                deporteActualizar.nombre = nombre;
            }
            if (precio) {
                deporteActualizar.precio = precio;
            }

            await fs.writeFile('./data/deportes.json', JSON.stringify(deportes, null, 2));
            return {
                msg: `El deporte asociado al ID: ${id} fue actualizado correctamente`,
                deportes
            };
        }

        return {
            msg: `No fue posible actualizar el deporte con id ${id}.`,
            deportes
        };
    } catch (error) {
        console.error(error);
        return {
            msg: "Error en el servidor",
            deportes: []
        };
    }
};


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
        deletebyIdDeportes,
    }