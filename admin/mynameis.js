const http = require("http");
const fs = require("fs");


fs.readdir("./", (err, files) => {
    if(err){
        console.error(err);
    }

    console.log(files);
})