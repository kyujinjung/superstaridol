const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getMissionList = asyncHandler(async(req, res) => {

    try {
        conn.query("select * from mission where isActive = 0", (req,resdb) => {
            res.render("mission", {heading : "LIST", list : resdb, now_loc : "mission" });
        })
    }
    catch(error){
        res.send(error.message);
    }
});

const createMission = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {num, name, req_level, max_level, type, req_rep, reward_exp, reward_popular, reward_attract, reward_jenny, reward_ruby, photo} = req.body;
    
    // 인서트하고
    conn.query(`insert into mission (name, req_level, max_level, type, req_rep, reward_exp, reward_popular, reward_attract, reward_jenny, reward_ruby, photo) values (
        
        '${name}','${req_level}','${max_level}','${type}','${req_rep}','${reward_exp}','${reward_popular}','${reward_attract}','${reward_jenny}','${reward_ruby}','${photo}'
    )`);
    res.status(201).send("Insert Mission Successfully");

})

const updateMission = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {num, name, req_level, max_level, type, req_rep, reward_exp, reward_popular, reward_attract, reward_jenny, reward_ruby, photo} = req.body;

    console.log(num);
    
    // 인서트하고
    conn.query(`update mission set name = '${name}', type = '${type}', photo='${photo}', req_level = '${req_level}', max_level='${max_level}', req_rep  ='${req_rep}', reward_jenny='${reward_jenny}', reward_ruby='${reward_ruby}', reward_attract = '${reward_attract}', reward_popular = '${reward_popular}', reward_exp = '${reward_exp}' where num = ${num}`);
    res.status(201).send("update Mission Successfully");

})

const deleteMission = asyncHandler(async(req, res) => {

    const {num} = req.body;

    console.log(num);

    // 인서트하고
    conn.query(`update mission set isActive = 1 where num = '${num}'`);
    res.status(201).send("delete Mission Successfully");

})

module.exports = {getMissionList, createMission, updateMission, deleteMission};