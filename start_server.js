const env = require('./env');
const http = require('http');

const start_server = http.createServer( (req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('');
}).listen(3000, 'localhost', () => console.log('Сервер работает'));


