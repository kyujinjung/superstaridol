const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getManagerList = asyncHandler(async(req, res) => {

    try {
        conn.query("select npc_manager.num, npc_manager.name, npc_manager.isActive, npc_manager.bonus, npc_manager.attractive, npc_manager.popular, npc_manager.ruby, npc_manager.createdAt, npc_manager.updatedAt, company.name as company_name from npc_manager left outer join company on company.num =  npc_manager.company", (req,resdb) => {            
            console.log(resdb);
            res.render("manager", {heading : "LIST", list : resdb, now_loc : "manager"});
        })
    }
    catch(error){
        res.send(error.message);
    }

    


});

const getProducerList = asyncHandler(async(req, res) => {

    try {
        conn.query("select npc_producer.num, npc_producer.name, npc_producer.isActive, npc_producer.bonus, npc_producer.attractive, npc_producer.popular, npc_producer.ruby, npc_producer.createdAt, npc_producer.updatedAt, company.name as company_name from npc_producer left outer join company on company.num =  npc_producer.company", (req,resdb) => {            
            console.log(resdb);
            res.render("producer", {heading : "LIST", list : resdb, now_loc : "producer"});
        })
    }
    catch(error){
        res.send(error.message);
    }

    


});


module.exports = {getManagerList,getProducerList};