const request = require('request');
const config = require('config');
const fs = require('fs');

class ProcessMessage{
    constructor(bot){
        this.bot = bot;
        this.BOT_TOKEN = config.get('BOT_TOKEN');
        this.process(this.bot.message);
    }

    process(message){}

    sendMessage(message){
        request({
            method: 'GET',
            url: `https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`,
            qs: {
                chat_id: this.bot.chat_id,
                text: message
            }
        }, function () {});
    }
}

module.exports = ProcessMessage;