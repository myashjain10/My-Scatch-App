const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");

router.get("/", (req, res)=>{
    res.send("Users route is working");
});

router.get("/register", (req,res) => {
    //register user
    //encrypt password and store the hash
    //generate jwt and send as cookie
    //add user in db
    //
    try{
        const {fullname, password, email} = req.body;
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password, salt, async (err,hash)=>{
                // password converted to hash
                //save it in db
                await userModel.create({
                    fullname,
                    password: hash,//remember to put hash, not password
                    email
                });
            });
        });

        let token = generateToken(user);
        res.cookie("token", token);
        res.send("User Created And Logged In");

    }catch(err){
        res.send(err.message);
    }
});
    

module.exports = router;