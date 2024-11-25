const mongoose = require("mongoose");
const MONGODB_URI = require("./development.json");
mongoose
.connect(MONGODB_URI)
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log(err);
});

module.exports = mongoose.connection;//
