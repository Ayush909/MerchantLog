const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidation , loginValidation} = require('../validation.js')

router.post('/register',async (req,res)=>{

    //lets validate using joi
    const {error} = registerValidation(req.body)
    // if(error) return res.status(400).send(error.details[0].message)
    if(error) return res.status(400).send('Please fill valid values')

    //check if user already exists
    const emailExist = await User.findOne({email : req.body.email})
    if(emailExist) return res.status(400).send('Email already exists!')

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    //create a new user
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    })
    try{
        const savedUser = await user.save();
        res.send({user: savedUser._id});
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/login', async (req,res)=>{
    //lets validate using joi
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //check if email exists or not
    const user = await User.findOne({email : req.body.email})
    if(!user) return res.status(400).send('Email not found')

    //check password
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send('Invalid password')

    //generating web token
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
    const { _id, name , email } = user
    res.header('auth-token',token).json({token, user:{_id,name,email} })

})

module.exports = router