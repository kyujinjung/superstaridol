const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getExpList = asyncHandler(async(req, res) => {

    try {
        conn.query("select * from exp where isActive = 0", (req,resdb) => {
            res.render("exp", {heading : "LIST", list : resdb, now_loc : "exp" });
        })
    }
    catch(error){
        res.send(error.message);
    }
});

const createExp = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {level, exp} = req.body;
    
    // 인서트하고
    conn.query(`insert into exp (level, exp) values (
        
        '${level}', '${exp}'
    )`);
    res.status(201).send("Insert Exp Successfully");

})

const updateExp = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {num, level, exp} = req.body;

    console.log(num);
    
    // 인서트하고
    conn.query(`update exp set level = '${level}', exp = '${exp}' where num = ${num}`);
    res.status(201).send("update Exp Successfully");

})

const deleteExp = asyncHandler(async(req, res) => {

    const {num} = req.body;

    console.log(num);

    // 인서트하고
    conn.query(`update exp set isActive = 1 where num = '${num}'`);
    res.status(201).send("delete Exp Successfully");

})

module.exports = {getExpList, createExp, updateExp, deleteExp};