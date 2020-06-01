const mongoose = require('mongoose')

const UserShopSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required : true
    },
    shop_name : {
        type: String,
        required : true,
        min : 3,
        max : 255
    },
    shop_address : {
        type : String,
        required : true,
        min : 10,
        max: 255
    },
    shop_phone : {
        type : String,
        required : true
    },
    date : {
        type: Date,
        default : Date.now
    }
})

module.exports = mongoose.model('UserShop', UserShopSchema)