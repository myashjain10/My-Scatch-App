const userModel = require("../models/user");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");


module.exports.registerUser = async (req, res) => {
    try{
        const {fullname, password, email} = req.body;
        //check if user already exists
        let existedUser = await userModel.findOne({email: email});
        if(existedUser){
            req.flash("error", "Email already registered!")
            return res.redirect("/");
        }

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password, salt, async (err,hash)=>{
                // password converted to hash
                //save it in db
                let user = await userModel.create({
                    fullname,
                    password: hash,//remember to put hash, not password
                    email
                });

                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/shop");

            });
        });

       

    }catch(err){
        console.log(err)
    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    //checking whether user exists in the db
    let user = await userModel.findOne({email: email});
    if(!user){
        req.flash("error","Email or password incorrect")
        return res.redirect("/");
    }
    //if user exists check password
    bcrypt.compare(password, user.password, (err, result)=> {
        //if password is correct then generate jwt
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");

        }else{
            req.flash("error","Email or password incorrect")
            return res.redirect("/"); 
        }
    });
}

module.exports.logoutUser = async (req, res)=>{
    //set cookies token to blank
    res.cookie("token","");
    res.redirect("/");
}