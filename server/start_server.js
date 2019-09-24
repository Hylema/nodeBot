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
    socket.emit('bot_status', true)
});

// io.on('connection', (socket) => {
//     socket.on('message', (msg) => {
//         io.emit('check', {
//             botStatusB: true
//         })
//     });
// });

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

// io.sockets.on('connection', function (socket) {
//     // Т.к. чат простой - в качестве ников пока используем первые 5 символов от ID сокета
//     var ID = (socket.id).toString().substr(0, 5);
//     var time = (new Date).toLocaleTimeString();
//     // Посылаем клиенту сообщение о том, что он успешно подключился и его имя
//     socket.json.send({'event': 'connected', 'name': ID, 'time': time});
//     // Посылаем всем остальным пользователям, что подключился новый клиент и его имя
//     socket.broadcast.json.send({'event': 'userJoined', 'name': ID, 'time': time});
//     // Навешиваем обработчик на входящее сообщение
//     socket.on('message', function (msg) {
//         var time = (new Date).toLocaleTimeString();
//         // Уведомляем клиента, что его сообщение успешно дошло до сервера
//         socket.json.send({'event': 'messageSent', 'name': ID, 'text': msg, 'time': time});
//         // Отсылаем сообщение остальным участникам чата
//         socket.broadcast.json.send({'event': 'messageReceived', 'name': ID, 'text': msg, 'time': time})
//     });
//     // При отключении клиента - уведомляем остальных
//     socket.on('disconnect', function() {
//         var time = (new Date).toLocaleTimeString();
//         io.sockets.json.send({'event': 'userSplit', 'name': ID, 'time': time});
//     });
// });



