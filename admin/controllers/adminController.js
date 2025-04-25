const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getAdminList = asyncHandler(async(req, res) => {

    try {
        conn.query("select * from admin", (req,resdb) => {
            res.render("admin", {heading : "LIST", list : resdb});
        })
    }
    catch(error){
        res.send(error.message);
    }
});

const createAdmin = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {id, password, name} = req.body;
    
    // 인서트하고
    conn.query(`insert into admin (id, password, name) values ('${id}', '${password}', '${name}')`);
    res.status(201).send("Insert admin Successfully");

})

module.exports = {getAdminList, createAdmin};