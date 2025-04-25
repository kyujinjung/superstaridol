const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getGroupList = asyncHandler(async(req, res) => {

    try {
        conn.query("select * from team", (req,resdb) => {
            res.render("group", {heading : "LIST", list : resdb, now_loc : 'group'});
        })
    }
    catch(error){
        res.send(error.message);
    }
});

const createGroup = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {name} = req.body;
    
    // 인서트하고
    conn.query(`insert into team (name, uploader, uploader_name) values ('${name}', 0, '관리자 생성')`);
    res.status(201).send("Insert Group Successfully");

})

module.exports = {getGroupList, createGroup};