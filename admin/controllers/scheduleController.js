const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getScheduleList = asyncHandler(async(req, res) => {

    try {
        conn.query("select * from schedule where isActive = 0 ", (req,resdb) => {
            res.render("schedule", {heading : "LIST", list : resdb, now_loc : "schedule" });
        })
    }
    catch(error){
        res.send(error.message);
    }
});

const createSchedule = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {name, req_level, req_ruby, req_exp, req_time, reward_popular, reward_exp, reward_attract, reward_ruby} = req.body;
    
    // 인서트하고
    conn.query(`insert into schedule (name, req_level, req_ruby, req_exp, req_time, reward_popular, reward_exp, reward_attract, reward_ruby) values (
        
        '${name}', '${req_level}', '${req_ruby}', '${req_exp}','${req_time}','${reward_popular}','${reward_exp}','${reward_attract}','${reward_ruby}'
    )`);
    res.status(201).send("Insert Schedule Successfully");

})

const updateSchedule = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {num, name, req_level, req_ruby, req_exp, req_time, reward_popular, reward_exp, reward_attract, reward_ruby} = req.body;

   
    // 인서트하고
    conn.query(`update schedule set 
        
        name = '${name}', 
        req_level = '${req_level}',
        req_ruby = '${req_ruby}',
        req_exp = '${req_exp}',
        req_time = '${req_time}',
        reward_popular = '${reward_popular}',
        reward_exp = '${reward_exp}',
        reward_attract = '${reward_attract}',
        reward_ruby = '${reward_ruby}'
                
        where num = '${num}'`);

    res.status(201).send("update Schedule Successfully");

})

const deleteSchedule = asyncHandler(async(req, res) => {

    const {num} = req.body;

    console.log(num);

    // 인서트하고
    conn.query(`update schedule set isActive = 1 where num = '${num}'`);
    res.status(201).send("delete Schedule Successfully");

})

module.exports = {getScheduleList, createSchedule, updateSchedule, deleteSchedule};