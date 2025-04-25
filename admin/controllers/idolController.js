const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getIdolList = asyncHandler(async(req, res) => {

    try {
        conn.query("select idol.num, idol.name, idol.team_name, idol.isActive, idol.bonus, idol.eyecolor, idol.personality, idol.photo, idol.createdAt, company.name as company_name from idol left outer join company on company.num =  idol.company", (req,resdb) => {            
            console.log(resdb);
            res.render("idol", {heading : "LIST", list : resdb, now_loc : "idol"});
        })
    }
    catch(error){
        res.send(error.message);
    }

    


});


module.exports = {getIdolList};