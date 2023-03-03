const connectToMongo=require('./db');
const express=require('express');

connectToMongo();

const app=express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello");
})

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.listen(5000,()=>{
    console.log('Connected to port 5000');
})
