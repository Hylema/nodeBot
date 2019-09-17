const env = require('./env');
const http = require('http');

const server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('');
}).listen(3000, 'localhost', () => console.log('Сервер работает'));


