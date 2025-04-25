const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getNpcList = asyncHandler(async(req, res) => {

    try {
        conn.query("select * from npc", (req,resdb) => {
            res.render("npc", {heading : "LIST", list : resdb, now_loc : "npc"});
        })
    }
    catch(error){
        res.send(error.message);
    }
});

const createNpc = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {name, req_level, req_cost, req_attract, req_famous, req_time, reward, reward_exp} = req.body;
    
    // 인서트하고
    conn.query(`insert into npc (name, req_level, req_cost, req_attract, req_famous, req_time, reward, reward_exp) values (
        
        '${name}', '${req_level}', '${req_cost}', '${req_attract}','${req_famous}','${req_time}','${reward}','${reward_exp}'
    )`);
    res.status(201).send("Insert Npc Successfully");

})

const updateNpc = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {num, name, type, photo, attractive, popular, ruby} = req.body;

   
    // 인서트하고
    conn.query(`update npc set 
        
        name = '${name}', 
        type = '${type}',
        photo = '${photo}',
        attractive = '${attractive}',
        popular = '${popular}',
        ruby = '${ruby}'
                
        where num = '${num}'`);

    res.status(201).send("update Npc Successfully");

})

const deleteNpc = asyncHandler(async(req, res) => {

    const {num} = req.body;

    console.log(num);

    // 인서트하고
    conn.query(`update npc set isActive = 1 where num = '${num}'`);
    res.status(201).send("delete Npc Successfully");

})


module.exports = {getNpcList, createNpc, updateNpc, deleteNpc};