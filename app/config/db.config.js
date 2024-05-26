const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

db.connect(err => {
    if(err){
        console.error("Erro ao conectar a base de dados:", err);
        process.exit(1)
    } else {
        console.log("Banco de dados conectado!")
    }
})

module.exports = db