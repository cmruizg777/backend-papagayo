const tokenAuthenticator = require('./../security/tokenAuthenticator')
module.exports = app => {
    const user = require("../controllers/user.controller");
    var router = require("express").Router();
    
    router.post('/login',  
    (req, res, next) => {
        if (req.body.username && req.body.password){
            next(); 
        }else{
            res.status(400);
            res.send({error: 'Debes proporcionar un username y un password.'})
        } 
    });
    // Create a new Tutorial
    router.post("/login", user.login);

    router.post("/saludo", tokenAuthenticator.authenticateToken , user.saludo);

    app.use('/', router);
  };