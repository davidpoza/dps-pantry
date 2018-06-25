'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargamos archivo de rutas
var item_routes = require('./routes/item');
var user_routes = require('./routes/user');
var list_routes = require('./routes/list');

//middlewares
//para que todo lo que llegue por body lo convierta a un objeto json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas

app.use('/api', item_routes);
app.use('/api', user_routes);
app.use('/api', list_routes);

module.exports = app;