const db = require("../models");
const clienteModel = require('../models/cliente.model');
//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const fechaNacimiento = req.body.fechaNacimiento;
    const cliente = {
        cedula, nombre, apellido, fechaNacimiento
    };

    clienteModel.nuevoCliente(cliente).then(()=>{
        res.status(200);
        res.send({mensaje: 'Cliente creado correctamente'});
    }).catch((reason)=>{
        res.status(500);
        res.send(reason);
    });
  };

  exports.all = (req, res) => {
    
    clienteModel.getClientes().then((clientes)=>{
        res.status(200);
        res.send(clientes);
    }).catch((reason)=>{
        res.status(500);
        res.send(reason);
    });
  };