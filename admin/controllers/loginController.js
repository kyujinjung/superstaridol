const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const chkUserLogin = asyncHandler(async(req, res) => {
    
    console.log(req.body);
    const {id, password} = req.body;

    conn.query(`select * from admin where id = '${id}' and pass = '${password}'`, (req,resdb) => {


        console.log(resdb);

        if(resdb){
            res.status(201).send("success");
        }
        else{
            res.status(204).send("failed");
        }
        
    })

})


module.exports = {chkUserLogin};