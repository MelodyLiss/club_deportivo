const { request, response } = require('express');
const { findAllDeportes, findByIdDeportes, insertDeportes, updateFromIdDeportes, deletebyIdDeportes } = require("../services/deportes.js")

const findByAllController = async (req = request, res = response) => {
    const respuesta = await findAllDeportes();
    const view = req.path === '/panel' ? 'panel-admin' : 'deportes';
    res.render(view, { deportes: respuesta.deportes })
}

const findByIdController = async (req = request, res = response) => {
    const id = req.query.id
    const respuesta = await findByIdDeportes(id);
    res.render('panel-admin', {
        deportes: respuesta.deportes,
        msg: respuesta.msg
    });
}

const insertController = async (req = request, res = response) => {
    const { nombre, precio } = req.body;
    if (nombre !== '' && precio !== '') {
        const nuevoDeporte = await insertDeportes(nombre, precio);
        res.render('panel-admin', {
            deportes: nuevoDeporte.deportes,
            msg: nuevoDeporte.msg
        });
    } else {
        res.render('panel-admin', {
            msg: 'Los campos no pueden estar vacíos'
        });
    }
}

const updataController = async (req = request, res = response) => {
    const { id, nombre, precio } = req.body;
    const deporteActualizado = await updateFromIdDeportes(id ,nombre,precio);
    if (deporteActualizado.msg) {
        res.render('panel-admin', {
            deportes: deporteActualizado.deportes,
            msg: deporteActualizado.msg 
        });
    } else {
        res.render('panel-admin', {
            msg: 'Error al actualizar el deporte'
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
    insertController,
    updataController,
    deleteController
}