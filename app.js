const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const path=require('path');

const authroute=require('./routes/auth')
const userroute=require('./routes/user');
const productroute=require('./routes/product');
const orderroute=require('./routes/order');

const app=express();
app.use(cors())
dotenv.config();
app.use(express.json());

app.use('/api/user',userroute);
app.use('/api/auth',authroute);
app.use('/api/product',productroute);
app.use('/api/order',orderroute);

mongoose.connect(process.env.MONGO_URL)
.then(()=>
console.log('database connected')).catch((err)=>{
    console.log(err);
})
if(process.env.NODE_ENV ==='production')
{
    app.use(express.static(path.join(__dirname,'/client/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    })
}
else{
    app.get('/',(req,res)=>{
        res.send("api running")
    })
}

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log('server is running');
})