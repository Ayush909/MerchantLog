const express = require('express')
const router  = express.Router()
const verify = require('./verifyToken')
const User = require('../models/user.model')
const UserShop = require('../models/userShop.model')
const {userShopValidation} = require('../validation')

router.post('/',verify,async (req,res)=>{

    const {error} = userShopValidation(req.body)
    // if(error) return res.status(400).send(error.details[0].message)
    if(error) return res.status(400).send('Please fill valid data')

    const user = await User.findById(req.body.user_id)

    const userShop = new UserShop({
        user_id : req.body.user_id,
        shop_name : req.body.shop_name,
        shop_address : req.body.shop_address,
        shop_phone : req.body.shop_phone
    })
    
    try{
        const savedUserShop = await userShop.save();
        res.send({usershop: savedUserShop});
    }catch(err){
        res.status(400).send(err);
    }
    
})

module.exports = router