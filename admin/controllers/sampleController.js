const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getAllList = asyncHandler(async(req, res) => {

    try {
        conn.query("select * from test", (req,resdb) => {

            res.render("list", {heading : "LIST", list : resdb});

        })


    }
    catch(error){
        res.send(error.message);
    }

    


});

const createContents = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        return res.status(400).send('Need More Things');
    }
    conn.query(`insert into test (name) values ('${name}')`);
    conn.end();

    res.status(201).send("Create Contactss");
})

module.exports = {getAllList, createContents};