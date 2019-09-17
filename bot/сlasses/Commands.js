const ProcessMessage = require('../ProcessMessage');
const request = require('request');

class Commands extends ProcessMessage{
    process(message) {
        // let stateUser = this.read();
        //
        // switch (stateUser.state) {
        //     case 0: this.sayHello(); break;
        //     case 1: this.test(); break;
        // }

        // switch (message) {
        //     case '/joke': this.getJoke(); break;
        //     default: this.sendMessage(
        //         `Взаимодействие со мной происхоид с помощью комманд:
        //     /joke`
        //     );
        // }
    }

    getJoke(){
        request({
            method: 'GET',
            url: `http://rzhunemogu.ru/Rand.aspx?CType=1`,
            encoding: 'utf-8',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        },  (error, response, message) => {
            if (!error && response.statusCode === 200) {
                this.sendMessage(message);
            }
        });
    }
}

module.exports = Commands;