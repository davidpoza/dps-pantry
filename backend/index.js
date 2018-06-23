'use strict'

var mongoogse = require('mongoose');
var app = require('./app');
var port = 3700;

mongoogse.Promise = global.Promise;
mongoogse.connect('mongodb://localhost:27017/portfolio')
    .then(() => {
        console.log("Conexión con exito");

        app.listen(port, () => {
            console.log("Servidor corriendo correctamente en la url: localhost:3700")
        })
    })
    .catch(err => console.log(err));