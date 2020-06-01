const express = require('express')
const router = express.Router()
const UserShop = require('../models/userShop.model')


router.post('/',(req,res)=>{
    
    UserShop.findOne({user_id: req.body.user_id}, function(err,obj) { 
        res.send(obj)
     });
            
       
      
})

module.exports = router