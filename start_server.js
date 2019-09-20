const mysql = require("mysql2");
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, './public');

const app = express();

app.use(express.static(publicPath));

app.get('/', function () {
   return require('./public/js/app');
});

app.listen(3000, () => {
    console.log('Сервер работает');

    const connection = mysql.createConnection({
        host: "127.0.0.1",
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
});


