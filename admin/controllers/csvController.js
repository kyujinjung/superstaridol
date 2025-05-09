const db = require("../db");
const xlsx = require('xlsx');
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getCsvList = asyncHandler(async(req, res) => {

    try {

        res.render("csv", {heading : "LIST",now_loc : "csv" });
    }
    catch(error){
        res.send(error.message);    
    }
});
    
module.exports = {getCsvList};