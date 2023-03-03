const express=require('express');
const router = express.Router();
const User=require('../models/User');
const bcrypt=require('bcryptjs');

const {body,validationResult} = require('express-validator')
var jwt=require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');

const JWT_SECRET='Manjotkaurvirk';


router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        let user=await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({error:'user already exist'})
        }

        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);
        user=await User.create({
            name:req.body.name,
            password:secPass,
            email:req.body.email
        })

        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        // console.log(authToken);
        res.json(authToken);
    }  
    catch(error){
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    } 
    // console.log(req.body);
    // const user=User(req.body);
    // user.save();
    // res.send(req.body);
})




router.post('/login',[
    body('email').isEmail(),
    body('password','Password cannot be blank').exists()
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:'Please login with correct credentials'});
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:'Please login with correct credentials'});
        }

        const payload={
            user:{
                id:user.id
            }
        }

        const authToken=jwt.sign(payload,JWT_SECRET);
        res.json({authToken});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
})


router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})



module.exports=router;