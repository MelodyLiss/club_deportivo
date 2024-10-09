const { request, response } = require('express');
const { findAllDeportes, findByIdDeportes, insertDeportes, updateFromIdDeportes, deletebyIdDeportes } = require("../services/deportes.js")

const findByAllController = async (req = request, res = response) => {
    const respuesta = await findAllDeportes();
    const view = req.path === '/panel' ? 'panel-admin' : 'deportes';
    res.render(view, { 
        deportes: respuesta.deportes,
        msg:respuesta.msg
     })
}
const findByIdController = async (req = request, res = response) => {
    const id = req.query.id;
    const respuesta = await findByIdDeportes(id);

    res.render('panel-admin', {
        deportes: respuesta.deportes,  
        msg: respuesta.msg,
        isError: respuesta.isError
    });
};

const findByNombreController = async (req, res) => {
    const nombreBuscado = req.query.nombre.toLowerCase(); 
    const respuesta = await findAllDeportes(); 

    const deportesFiltrados = respuesta.deportes.filter(deporte => 
        deporte.nombre.toLowerCase().includes(nombreBuscado)
    );

    res.render('deportes', {
        deportes: deportesFiltrados,
        msg: deportesFiltrados.length ? '' : 'No se encontraron deportes que coincidan con tu búsqueda.',
        isError: false
    });
}

const insertController = async (req = request, res = response) => {
    const { nombre, precio } = req.body;
    if (nombre !== '' && precio !== '') {
        const nuevoDeporte = await insertDeportes(nombre, precio);
        res.render('panel-admin', {
            deportes: nuevoDeporte.deportes,
            msg: nuevoDeporte.msg,
            isError: false
            
            
    
        });
    } else {
        const deportes = await findAllDeportes();
        res.render('panel-admin', {
            deportes: deportes.deportes,
            msg: 'Los campos no pueden estar vacíos',
            isError: true
        });
    }
}

const updataController = async (req = request, res = response) => {
    const { id, nombre, precio } = req.body;

    if (nombre !== '' || precio !== '') {
        const deporteActualizado = await updateFromIdDeportes(id, nombre, precio);
        res.render('panel-admin', {
            deportes: deporteActualizado.deportes,
            msg: deporteActualizado.msg,
            isError: false
        });
    } else {
        const deportes = await findAllDeportes();
        
        
        res.render('panel-admin', {
            deportes: deportes.deportes,
            msg: `NO SE REALIZARON CAMBIOS AL DEPORTE CON EL ID ${id}`,
            isError: true
        });
    }
}


const deleteController = async (req = request, res = response) => {
    const id = req.query.id;
    const respuesta = await deletebyIdDeportes(id);
    res.render('panel-admin', {
        deportes: respuesta.deportes,
        msg: respuesta.msg
    });
}




module.exports = {
    findByAllController,
    findByIdController,
    findByNombreController,
    insertController,
    updataController,
    deleteController
}