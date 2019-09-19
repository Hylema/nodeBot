const request = require('request');
const ProcessMessage = require('../ProcessMessage');

class Greetings extends ProcessMessage{
    process(message) {

        const state: number = this.bot.conversationGet('state');

        switch (state) {
            case 0: this.sayHello(); break;
            case 1: this.test(); break;
            default:
                console.error('Такого state нету');
        }
    }

    private sayHello(){
        this.sendMessage(
            `Привет, я бот Цирей, вижу ты новый пользователь с которым я ещё не общался. Взаимодействие со мной происхоид с помощью комманд, вот их список: 
            /joke`
        );

        this.bot.conversationSet('state', 1);
    }

    private test(){
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

export = Greetings;