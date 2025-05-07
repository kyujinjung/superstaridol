const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getItemList = asyncHandler(async(req, res) => {

    try {
        conn.query("select * from item", (req,resdb) => {
            conn.query("select * from item_type",(req, resType) => {
                res.render("item", {heading : "LIST", list : resdb, typeList : resType, now_loc : "item" });
            });
        })
    }
    catch(error){
        res.send(error.message);    
    }
});

const createItem = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {name, req_jenny, type, req_level, extra_popular, extra_attract, reward_jenny, reward_ruby, photo, description} = req.body;
    
    // 인서트하고
    conn.query(`name, req_jenny, type, req_level, extra_popular, extra_attract, reward_jenny, reward_ruby, photo, description) values (
        
        '${name}', '${req_jenny}', '${type}', '${req_level}', '${extra_popular}', '${extra_attract}', '${reward_jenny}', '${reward_ruby}', '${photo}', '${description}'
        
    )`);
    res.status(201).send("Insert Item Successfully");

})


const updateItem = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {num, name, req_jenny, type, req_level, extra_popular, extra_attract, reward_jenny, reward_ruby, photo, description} = req.body;

    console.log(num);
    
    // 인서트하고
    conn.query(`update item set  name = '${name}', req_jenny = '${req_jenny}', type = '${type}', req_level = '${req_level}', extra_popular = '${extra_popular}', extra_attract = '${extra_attract}', reward_jenny = '${reward_jenny}', reward_ruby = '${reward_ruby}', photo = '${photo}', description = '${description}' where num = ${num}`);
    res.status(201).send("update Item Successfully");

})

const deleteItem = asyncHandler(async(req, res) => {

    const {num} = req.body;

    console.log(num);

    // 인서트하고
    conn.query(`update item set isActive = 1 where num = '${num}'`);
    res.status(201).send("delete Item Successfully");

})

module.exports = {getItemList, createItem, updateItem, deleteItem};