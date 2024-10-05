const {request, response} = require('express');
const {findAllDeportes,findByIdDeportes,insertDeportes,updateFromIdDeportes,deletebyIdDeportes} = require("../services/deportes.js")

const findByAllController = async (req = request, res= response)=>{
    const respuesta = await findAllDeportes();
    const view = req.path === '/panel' ? 'panel-admin' : 'deportes';
    res.render(view, { deportes: respuesta.deportes })
}

const findByIdController = async (req = request, res= response)=>{
    const id = req.query.id
    const respuesta = await findByIdDeportes(id);
    res.render('deportes',{
        id: respuesta.deportes
    });
}

const insertController = async (req = request, res= response)=>{
    const nombre = req.body.nombre
    const precio = req.body.precio
    const nuevoDeporte = await  insertDeportes();
    res.render( 'deportes',nuevoDeporte);
}

const updataController = async (req = request, res= response)=>{
    const id = dato0
    const nombre = dato1
    const precio = dato2

    const deporteActualizado = await updateFromIdDeportes();
    res.render(deporteActualizado)
}

const deleteController = async (req = request, res= response)=>{
    const id = dato0

    const eliminacionDeporte = await deletebyIdDeportes();
    res.render(eliminacionDeporte)
}

module.exports = {
    findByAllController,
    findByIdController,
    insertController,
    updataController,
    deleteController
}