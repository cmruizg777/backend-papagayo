const db = require("../models");
const userModel = require('../models/user.model');
const authenticator = require('./../security/tokenAuthenticator');
//const Op = db.Sequelize.Op;

exports.login = (req, res) => {
    // Validate request
    const username = req.body.username;
    const password = req.body.password;
    let currentUser;
    // Save Tutorial in the database
    userModel.verificarUsuario(username).then((result)=>{
        if(result){
            return result;
        }else{
            res.status(400);
            res.send({mensaje: 'Usuario no existe'});
        }
    }).then((user)=>{
        const realPassword = user.password;
        const isCorrect = userModel.verificarPassword(realPassword, password);
        currentUser = user;
        return isCorrect;
    }).then((isCorrect)=>{

        if(isCorrect){
            const token =  authenticator.generateAccessToken(currentUser.toJSON());
            res.status(200);
            res.send({token});
        }else{
            res.status(401);
            res.send({mensaje: 'Contraseña incorrecta'});
        }
    }).catch((reason)=>{
        res.status(500);
        res.send(reason);
    });
  };

  exports.saludo = (req, res)=>{
    res.status(200);
    res.send({mensaje: 'OK'});
  }
