const mysql = require("mysql2");
const express = require('express');
const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "root",
    database: 'ggg'
});
connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

app.get('/', function (req, resp) {
   connection.query("SELECT * FROM mySampleTable", function (error, rows, f) {
       if(!!error){
           console.log('e');
       } else {
           console.log('s');
       }
   })
});

app.listen(1337);