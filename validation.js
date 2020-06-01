const joi = require('@hapi/joi')

//register validation
const registerValidation = (data)=>{
    const schema = joi.object({
        name: joi.string().min(3).required().pattern(new RegExp('^[a-zA-Z ]{3,35}$')),
        email : joi.string().min(6).required().email(),
        password : joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9@_-]{6,25}$'))
    })
    return schema.validate(data);
}

//login validation
const loginValidation = (data)=>{
    const schema = joi.object({
        email : joi.string().min(6).required().email(),
        password : joi.string().min(6).required()
    })
    return schema.validate(data);
}
//userShop validation

const telephoneRegExp = /^[0-9]{10}$/

const userShopValidation = (data)=>{
    const schema = joi.object({
        user_id : joi.string().required(),
        shop_name : joi.string().min(3).required().pattern(new RegExp('^[a-zA-Z0-9 ]{3,35}$')),
        shop_address : joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9 -:/.&]{10,100}$')),
        shop_phone : joi.string().pattern(new RegExp('^[0-9]{10}$')).required()
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.userShopValidation = userShopValidation
