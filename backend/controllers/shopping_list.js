'use strict'
var Item = require('../models/item')
var User = require('../models/user')
var ShoppingList = require('../models/shopping_list')

var controller = {
    /*añade un item a la lista de la compra del usuario cuyo id indique
    la cabecera de autenticación*/
    addShoppingList: function(req,res){
        var shoppingList = new ShoppingList();
        var params = req.body;
        shoppingList.item = params.item;
        shoppingList.user = req.user.sub;
        shoppingList.quantity = req.quantity;

        /*Comprobamos el item antes de insertarlo en la lista de la compra*/
                    
        Item.findById(params.item, (err, item) => {
            if(err) return res.status(500).send({message: 'Error al comprobar item.'});
            if(!item) return res.status(404).send({message: 'No existe el item.'});
            
            shoppingList.save(shoppingList, (err, shoppingListStored) => {
                if(err) return res.status(500).send({message: 'Error al guardar lista de la compra.'});
                if(!shoppingListStored) return res.status(404).send({message: 'No se ha podido guardar la lista de la compra.'});
                return res.status(200).send({shoppingList: shoppingListStored});
            });
        }) 
        
        
    },
  
}

module.exports = controller;