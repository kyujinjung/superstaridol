const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getCsvList = asyncHandler(async(req, res) => {

    try {
        conn.query("select * from item", (req,resdb) => {
            conn.query("select * from item_type",(req, resType) => {
                res.render("csv", {heading : "LIST", list : resdb, typeList : resType, now_loc : "item" });
            });
        })
    }
    catch(error){
        res.send(error.message);    
    }
});

const createCsv = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {name, type, req_level, req_ruby, reward_attract} = req.body;
    
    // 인서트하고
    conn.query(`insert into item (name, type, req_level, req_ruby, reward_attract) values (
        
        '${name}', '${type}', '${req_level}', '${req_ruby}','${reward_attract}'
    )`);
    res.status(201).send("Insert Item Successfully");

})

module.exports = {getCsvList, createCsv};