const express = require('express')
const app = express()
const authRouter = require('./routes/auth')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const shopRouter = require('./routes/shops')
const isShopReg = require('./routes/isShopReg')
const userDataRouter = require('./routes/userData')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv/config')

const PORT = process.env.PORT || 5000

//db connection
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true } ,()=>console.log('DB Connected'))


app.use(cors())
app.use(cookieParser());
app.use(express.json());

//Route middlewares
app.use('/api/user',authRouter);
app.use('/api/shops',shopRouter);
app.use('/api/isShopReg',isShopReg);
app.use('/api/userdata',userDataRouter)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}



app.listen(PORT,()=>console.log("Server runnning..."));