const db = require("../models");
const clienteModel = require('../models/cliente.model');
const validator = require('./../services/cliente.validator');
//const Op = db.Sequelize.Op;
exports.validator = validator;
exports.create = (req, res) => {
    // Validate request
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const fechaNacimiento = req.body.fechaNacimiento;
    const nHijos = req.body.nHijos;
    const cliente = {
        cedula, nombre, apellido, fechaNacimiento, nHijos
    };

    clienteModel.nuevoCliente(cliente).then(()=>{
        res.status(200);
        res.send({mensaje: 'Cliente creado correctamente'});
    }).catch((reason)=>{
        res.status(500);
        res.send(reason);
    });
  };

  exports.update = (req, res) => {
    
    const id = req.params.id;
    
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const fechaNacimiento = req.body.fechaNacimiento;
    const nHijos = req.body.nHijos;
    const cliente = {
        cedula, nombre, apellido, fechaNacimiento, nHijos
    };

    clienteModel.actualizarCliente(id,cliente).then(()=>{
        res.status(200);
        res.send({mensaje: 'Cliente actualizado correctamente'});
    }).catch((reason)=>{
        res.status(500);
        res.send(reason);
    });
  };

  exports.delete = (req, res) => {
    
    const id = req.params.id;
    
    clienteModel.borrarCliente(id).then(()=>{
        res.status(200);
        res.send(true);
    }).catch((reason)=>{
        res.status(500);
        res.send(reason);
    });
  };
  exports.find = (req, res) => {
    const id = req.params.id;
    clienteModel.buscar(id).then((cliente)=>{
        res.status(200);
        res.send(cliente);
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
  

  exports.cargarCSV = async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            const csv = req.files.csv;
            const data = csv.data.toString('utf-8');
            const rows = data.split('\n');
            let errors = [];
            rows.forEach(row => {
                try{
                    const cols = row.split(',');
                    const cedula = cols[0];
                    if(cedula){
                        if(validator.validarCedula(cedula)){
                            const nombre = cols[1];
                            const apellido = cols[2];
                            const nHijos = cols[3];
                            const fechaNacimiento = new Date(cols[4]);
                            const cliente = {
                                cedula, nombre, apellido, nHijos, fechaNacimiento
                            };
                            clienteModel.nuevoCliente(cliente);
                        }else{                        
                            throw (`Cliente con cedula ${cedula}, no válido`);
                        }
                    }                                        
                }catch(error){
                    errors.push(error);
                }
                
            });
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            //avatar.mv('./uploads/' + avatar.name);

            //send response
            res.send({
                status: (errors.length > 0 ) ? 202: 200 ,
                message: 'File is uploaded',
                errors
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.downloadFormatCSV = (req, res) => {
    const file = `files/clientes.csv`;
    res.download(file); // Set disposition and send it.
  };