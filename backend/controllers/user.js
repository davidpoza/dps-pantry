'use strict'
var bcrypt = require('bcrypt-nodejs')
var User = require('../models/user')

var controller = {
    getUsers: function(req,res){
        User.find({}).exec((err, users) => {
            if(err) return res.status(500).send({message: 'Error al devolver usuarios.'});
            if(!users) return res.status(404).send({message: 'No hay usuarios que mostrar.'});
            return res.status(200).send({users});
        })
    },
    getUser: function(req,res){
        var userId = req.params.id;
        if(userId == null) return res.status(404).send({message: 'El usuario no existe.'});

        User.findById(userId, (err, user) => {
            if(err) return res.status(500).send({message: 'Error al devolver usuario.'});
            if(!user) return res.status(404).send({message: 'El usuario no existe.'});
            return res.status(200).send({user});
        })
    },
    updateUser: function(req,res){
        var userId = req.params.id;
        var update = req.body;
        User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar usuario.'});
            if(!userUpdated) return res.status(404).send({message: 'No existe el usuario a actualizar'});
            return res.status(200).send({user: userUpdated})
        });
    },
    deleteUser: function(req,res){
        var userId = req.params.id;
        User.findByIdAndRemove(userId, (err, userDeleted) => {
            if(err) return res.status(500).send({message: 'Error al borrar usuario.'});
            if(!userDeleted) return res.status(404).send({message: 'No existe el usuario a borrar'});
            return res.status(200).send({user: userDeleted})
        });
    },
    addUser: function(req,res){
        var user = new User();
        var params = req.body;       

        if(params.name && params.nick && params.email && params.password){
            user.name = params.name;
            user.nick = params.nick;
            user.email = params.email;
            
            //comprobamos si el usuario ya existe previamente
            User.find({ $or: [
                {email: user.email.toLowerCase()},
                {nick: user.nick.toLowerCase()}
            ]}).exec((err,users) => {
                if(err) return res.status(500).send({message: 'Error en la petición de usuarios.'})
                if(users && users.length >= 1){
                    return res.status(200).send({message: 'El usuario ya existe.'}) 
                }
                else{
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;
                        user.save((err, userStored) => {
                            if(err) return res.status(500).send({message: 'Error al guardar usuario.'});
                            if(!userStored) return res.status(404).send({message: 'No se ha podido guardar el usuario.'});
                            return res.status(200).send({user: userStored});
                        });
                    });
                }
            });

            
        }
        else{
            res.status(200).send({
                message: 'Es necesario enviar todos los campos.'
            })
        }
        
    },
    loginUser: function(req,res){
        var params = req.body;
        var email = params.email;
        var password = params.password;

        User.findOne({email: email}, (err, user) => {
            if(err) return res.status(500).send({message:'Error en la petición'});
            if(user){
                bcrypt.compare(password, user.password, (err, check) => {
                    if(check){ //comparación correcta
                        return res.status(200).send({user})
                    }
                    else{
                        return res.status(404).send({messsage: 'El usuario no se ha podido identificar.'})
                    }
                })
            }
            else{
                return res.status(404).send({messsage: 'El usuario no se ha podido identificar.'})
            }
        });
    }

}

module.exports = controller;