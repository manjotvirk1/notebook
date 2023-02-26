const connectToMongo=require('./db');
const express=require('express');

connectToMongo();

const app=express();

app.get('/',(req,res)=>{
    res.send("Hello");
})

app.listen(5000,()=>{
    console.log('Connected to port 5000');
})