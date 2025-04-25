const db = require("../db");
const conn = db.conn;
const asyncHandler = require("express-async-handler");

const getTokenAiley = asyncHandler(async(req, res) => {


    console.log(res);
    
})


module.exports = {getTokenAiley};