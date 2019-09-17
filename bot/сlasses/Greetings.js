const request = require('request');
const config = require('config');
const fs = require('fs');
const ProcessMessage = require('../ProcessMessage');

class Greetings extends ProcessMessage{
    process(message) {

        let stateUser = this.read();

        switch (stateUser.state) {
            case 0: this.sayHello(); break;
            case 1: this.test(); break;
        }
    }

    sayHello(){
        this.sendMessage(
            `Привет, я бот Цирей, вижу ты новый пользователь с которым я ещё не общался. Взаимодействие со мной происхоид с помощью комманд, вот их список: 
            /joke`
        );

        this.changeState('conversation', 'Commands');
    }

    test(){
        // let params = {
        //     'ask': 'Привет',
        //     'userid': '654321',
        //     'key': ''
        // };
        //
        // //let result = JSON.stringify(params);
        //
        // let ag = {
        //     'userid': '654321',
        //     'query': params,
        // };
        //
        // request({
        //     method: 'POST',
        //     url: `https://api.dialogflow.com/v1/`,
        //     authorization: 'Bearer 7f9a69a6915c457dadbff451ab09aaf5',
        //     qs: {
        //         contexts: [
        //             "shop"
        //         ],
        //         lang: "en",
        //         query: "I need apples",
        //         sessionId: "12345",
        //         timezone: "America/New_York"
        //     }
        // }, function (error, response, message) {
        //     if (!error && response.statusCode === 200) {
        //         console.log(response, 'response');
        //         console.log(message, 'message');
        //         console.log(error, 'error');
        //     }
        // });
    }
}

module.exports = Greetings;