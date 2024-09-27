const mongoose = require("mongoose");

mongoose
.connect("mongodb+srv://yashjain2312:Y9WkD20gObG2p7fN@cluster0.yidxr0i.mongodb.net/")
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log(err);
});

module.exports = mongoose.connection;//
