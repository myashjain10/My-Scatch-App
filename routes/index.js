const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const productModel = require("../models/product");

router.get("/", (req, res)=>{
    let error = req.flash("error");//saved during registerUser/isLoggedIn route
    res.render("index",{ error, loggedin: false });
});

router.get("/cart", isLoggedIn, (req,res)=>{
    res.render("cart");
});

router.get("/shop", isLoggedIn, async (req, res) => {
    //get all products
    const items = user.cart.length();
    let products = await productModel.find();
    res.render("shop", { products, items} );
});

module.exports = router;//dont forget to export