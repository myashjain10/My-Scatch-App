const express = require('express');
const router = express.Router();

 router.get("/", (req, res)=>{
    res.send("From owner router");
 });

 module.exports = router;