const jwt = require("jsonwebtoken");
const userModel = require("../models/user");


module.exports.isLoggedIn = async (req, res, next)=>{
    //if token doesnt exists
    if(!req.cookies.token){
        //setting flash message
        req.flash("error", "you need to login first");
        return res.send("no token, please log in");
    }

    try{
        //verify token
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({email: decoded.email}).select("-password");
        //.select("-password") does not fetch password value

        req.user = user;//for next functions or  middlewares
        
        next();



    }catch(err){
        //any error in try block means token was invalid
        req.flash("error", "Something went wrong");
        res.send("token invalid");
    }
}