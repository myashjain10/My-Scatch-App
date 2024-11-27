const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner");

 router.get("/", (req, res)=>{
    res.send("From owner router");
 });

 router.post("/create", async (req,res) => {
   // fullname
   const {fullname, email, password} = req.body;

   //if user exists already, send error
   const owner = await ownerModel.find();

   if(owner.length > 0) return res.status(503).send("Cant create owner");

   let newOwner = await ownerModel.create({
      fullname,
      email,
      password
   })

   res.status(200).send(newOwner);

 })

 module.exports = router;