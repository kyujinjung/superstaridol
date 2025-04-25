const express = require("express");
const db = require("./db");
const conn = db.conn;
const app = express();
const port  = 8001;
const errorhandler = require("./middlewares/errorhandler");
const path = require("path");

app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("./public"));

app.get("/", (req, res, next) => {

    res.render("index", {now_loc : "index"});

})

app.get("/api/login", (req, res, next) => {

    res.render("api_login", {now_loc : "api_login"});

})


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/", require("./routes/router"));
app.use(errorhandler);


app.listen(port, () => {
    console.log(port+"port");
});