const authenticator = require('./../security/tokenAuthenticator')
module.exports = app => {
    const cliente = require("../controllers/cliente.controller.js");
  
    var router = require("express").Router();
    
    router.post('/',  
    (req, res, next) => {
        //console.log(req.body)
        if (req.body.cedula){
            next(); 
        }else{
            res.status(400);
            res.send({error: 'Debes proporcionar una cédula.'})
        } 
    }, 
    (req, res, next) => {
        const cedula =  req.body.cedula;
        if (cedula.length == 10){
            next('route');
        }else{
            res.status(400);
            res.send({error: 'Cédula no válida.'})
        } 
    });

   
    router.post("/", cliente.create);
    
    router.get("/", cliente.all);
  
    // Retrieve all cliente
    //router.get("/", cliente.findAll);
  
    // Retrieve all published cliente
    //router.get("/published", cliente.findAllPublished);
  
    // Retrieve a single Tutorial with id
    //router.get("/:id", cliente.findOne);
  
    // Update a Tutorial with id
    //router.put("/:id", cliente.update);
  
    // Delete a Tutorial with id
    //router.delete("/:id", cliente.delete);
  
    // Delete all cliente
    //router.delete("/", cliente.deleteAll);
  
    app.use('/api/cliente', authenticator.authenticateToken, router);
  };