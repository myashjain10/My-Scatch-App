const userModel = require("../models/user");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");


module.exports.registerUser = async (req, res) => {
    try{
        const {fullname, password, email} = req.body;
        //check if user already exists
        let existedUser = await userModel.findOne({email: email});
        if(existedUser){
            return res.send("Email Already registered");
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
                res.send("User Created And Logged In");

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
        return res.send("Email or Password Incorrect");
    }
    //if user exists check password
    bcrypt.compare(password, user.password, (err, result)=> {
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("Correc email and passowrd : Logged In");

        }else{
            return res.send("Email or password incorrect");
        }
    });

    //if password is correct then generate jwt
    let token = generateToken(user);
    res.cookie("token", token);
    res.send("Correc email and passowrd : Logged In");


}