const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config")
const productModel = require("../models/product")

router.get("/",(req,res)=>{
    res.send("product route is working")
});

router.post("/create", upload.single("image"), async (req, res)=>{
   let {name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

   try{
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });
        req.flash("success","Product Successfully Created")
        res.redirect("/owners/admin");
    }catch(err){
        res.send(err.message);
    }k
});


module.exports = router;