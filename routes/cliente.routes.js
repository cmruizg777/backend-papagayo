const authenticator = require('./../security/tokenAuthenticator');

module.exports = app => {
    const cliente = require("../controllers/cliente.controller.js");
    const validator = cliente.validator;
    var router = require("express").Router();
    
    var validarCedulaCliente = (req, res, next) => {
        const cedula =  req.body.cedula;
        if(cedula){
            const isValid = validator.validarCedula(cedula);

            if (isValid){
                next('route');
            }else{
                res.status(400);
                res.send({error: 'Cédula no válida.'})
            }
        }else{

        }
         
    } 

    router.post('/',  validarCedulaCliente);
   
    router.post("/", cliente.create);
    
    router.get("/", cliente.all);

    router.get("/buscar/:id", cliente.find);

    router.get("/format", cliente.downloadFormatCSV);

    router.put("/:id", cliente.update);

    router.delete("/:id", cliente.delete);

    router.post("/csv", cliente.cargarCSV);
  
    app.use('/api/cliente', authenticator.authenticateToken, router);
  };