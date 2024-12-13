const cookieParser = require("cookie-parser");
const path = require("path");

const express = require("express");
const app = express();
const db = require("./config/mongoose-connection")
const indexRoutes = require("./routes/index");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join( __dirname , "public" )));//for static files like images
app.set("view engine", "ejs");
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  }))
app.use(flash());

app.use("/", indexRoutes)
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.listen(3001, (err)=>{
    if(err) console.log(err);
    else console.log(`${process.env.EXPRESS_SESSION_SECRET}`);
});