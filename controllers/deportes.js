const {request, response} = require('express');
const {findAllDeportes,findByIdDeportes,insertDeportes,updateFromIdDeportes,deletebyIdDeportes} = require("./services/deportes.js")

const findByAllController = async (req = request, res= response)=>{
    const listadoDeporte = await findAllDeportes();
    res.render(listadoDeporte);
}

const findByIdController = async (req = request, res= response)=>{
    const deporteById = await findByIdDeportes();
    res.render(deporteById);
}

const insertController = async (req = request, res= response)=>{
    const nombre = dato1
    const precio = dato2
    const nuevoDeporte = await  insertDeportes();
    res.render(nuevoDeporte);
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
    res.render(eliminacionDeporte);
}

module.exports = {
    findByAllController,
    findByIdController,
    insertController,
    updataController,
    deleteController
}