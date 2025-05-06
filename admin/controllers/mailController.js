const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getMailList = asyncHandler(async(req, res) => {

    try {
        conn.query("select * from schedule where isActive = 0 ", (req,resdb) => {
            res.render("mail", {heading : "LIST", list : resdb, now_loc : "mail" });
        })
    }
    catch(error){
        res.send(error.message);
    }
});

const createMail = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {name, req_level, req_ruby, req_exp, req_time, reward_popular, reward_exp, reward_attract, reward_ruby} = req.body;
    
    // 인서트하고
    conn.query(`insert into schedule (name, req_level, req_ruby, req_exp, req_time, reward_popular, reward_exp, reward_attract, reward_ruby) values (
        
        '${name}', '${req_level}', '${req_ruby}', '${req_exp}','${req_time}','${reward_popular}','${reward_exp}','${reward_attract}','${reward_ruby}'
    )`);
    res.status(201).send("Insert Schedule Successfully");

})

module.exports = {getMailList, createMail};