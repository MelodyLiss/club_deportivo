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
    res.render('panel-admin',{
        deportes: respuesta.deportes
    });
}

const insertController = async (req = request, res= response)=>{
    console.log('Entire req.body:', req.body);
    const {nombre ,precio} = req.body;
    const nuevoDeporte = await  insertDeportes(nombre,precio);
    res.render( 'panel-admin',{
        deportes: nuevoDeporte.deportes});
}

const updataController = async (req = request, res= response)=>{
    const id = dato0
    const nombre = dato1
    const precio = dato2

    const deporteActualizado = await updateFromIdDeportes();
    res.render(deporteActualizado)
}

const deleteController = async (req = request, res= response)=>{
    const id = req.query.id;
    const respuesta = await deletebyIdDeportes(id);
    res.render('panel-admin',{
        deportes: deportes});
}

module.exports = {
    findByAllController,
    findByIdController,
    insertController,
    updataController,
    deleteController
}