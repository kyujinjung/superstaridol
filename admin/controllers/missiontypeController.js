const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getMissionTypeList = asyncHandler(async(req, res) => {

    try {
        conn.query("select * from mission_type where isActive = 0", (req,resdb) => {
            res.render("mission_type", {heading : "LIST", list : resdb, now_loc : "mission_type" });
        })
    }
    catch(error){
        res.send(error.message);
    }
});

const createMissionType = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {name} = req.body;
    
    // 인서트하고
    conn.query(`insert into mission_type (name) values (
        
        '${name}'
    )`);
    res.status(201).send("Insert Mission Type Successfully");

})

const updateMissionType = asyncHandler(async(req, res) => {

    console.log(req.body);
    const {num, name} = req.body;

    console.log(num);
    
    // 인서트하고
    conn.query(`update mission_type set name = '${name}' where num = ${num}`);
    res.status(201).send("update Mission Type Successfully");

})

const deleteMissionType = asyncHandler(async(req, res) => {

    const {num} = req.body;

    console.log(num);

    // 인서트하고
    conn.query(`update mission_type set isActive = 1 where num = '${num}'`);
    res.status(201).send("delete Mission Type Successfully");

})

module.exports = {getMissionTypeList, createMissionType, updateMissionType, deleteMissionType};