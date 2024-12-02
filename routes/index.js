const express = require("express");
const router = express.router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.get("/", (req, res)=>{
    let error = req.flash("error");//saved during isLoggedIn route
    res.render("index",{ error })
});

router.get("/shop", isLoggedIn, (req, res) => {
    res.render("shop");
});