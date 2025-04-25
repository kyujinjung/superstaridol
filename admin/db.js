const mariadb = require("mariadb/callback");
const conn = mariadb.createConnection({
    host : 'forecodes.com',
    port : '3306',
    user : 'porecodes',
    password : 'boro200403!@',
    database : 'porecodes'
})

module.exports.conn = conn;