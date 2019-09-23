const mysql = require("mysql2");
const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

server.listen(3000, () => {
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

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        io.emit('check', {
            botStatusB: true
        })
    });
});

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });



