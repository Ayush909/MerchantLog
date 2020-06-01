const express = require('express')
const router = express.Router()
const UserShop = require('../models/userShop.model')


router.get('/',(req,res)=>{
       UserShop.find()
       .select('shop_name shop_address shop_phone user_id')
       .then(Response=>{
           res.send(Response)
       })
})

module.exports = router