const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.get("/", (req, res)=>{
    let error = req.flash("error");//saved during registerUser/isLoggedIn route
    res.render("index",{ error })
});

router.get("/shop", isLoggedIn, (req, res) => {
    res.render("shop");
});

module.exports = router;//dont forget to export