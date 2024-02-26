const express = require("express");
const router = express.Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helpers")

router.post("/register", async(req,res)=>{
    const {email, password, firstName, lastName, userName} = req.body;

    const user = await User.findOne({email: email});

    if(user){
        return res.status(403).json({
            error:"Email is already registered"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newUserData = {email, password : hashedPassword, firstName, lastName, userName};
    const newUser = await User.create(newUserData);

    const token = await getToken(email, newUser);

    const userToreturn = {...newUser.toJSON(), token};

   delete userToreturn.password;

    return res.status(200).json({
        success:true,
        userToreturn
    })

});

router.post("/login", async(req,res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email:email});
    
    if(!user){
        return res.status(403).json({
            error:"invalid credentials"
        })
    }
    const comapre = await bcrypt.compare(password,user.password );
    if(!comapre){
        return res.status(403).json({
            error:"invalid Password"
        })
    }

    const token = await getToken(user.email, user);
    const userToreturn = {...user.toJSON(), token};

    delete userToreturn.password;

    return res.status(200).json({
        success:true,
        userToreturn
    })

})

module.exports = router;