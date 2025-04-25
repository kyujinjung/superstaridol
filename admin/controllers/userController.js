const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getUserList = asyncHandler(async(req, res) => {

    try {
        conn.query("select user.num, user.ailey_id, user.createdAt, company.name, company.exp, company.level, company.attractive, company.popular, company.idol, user.ruby from company left outer join user on company.user = user.num", (req,resdb) => {
            console.log(resdb);

            res.render("user", {heading : "LIST", list : resdb, now_loc : "user"});

        })
    }
    catch(error){
        res.send(error.message);
    }

    


});

const createUser = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {id, password, email, name, nickname, address} = req.body;
    
    // 인서트하고
    conn.query(`insert into user (id, password, email, name, nickname, address) values ('${id}','${password}','${email}','${name}','${nickname}','${address}')`);
    res.status(201).send("Insert User Successfully");

})

module.exports = {getUserList, createUser};