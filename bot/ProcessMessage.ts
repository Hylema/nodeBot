const request = require('request');
const General_class = require('../src/General_class');

class ProcessMessage extends General_class{
    private bot: any;
    private message: string;

    constructor(bot){
        super();
        this.bot = bot;
        this.message = bot.message;

        this.process();
    }

    process(message:string = this.message){}

    sendMessage(message){

        request({
            method: 'GET',
            url: `https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`,
            qs: {
                chat_id: this.bot.CHAT_ID,
                text: message
            }
        }, () => {});

        console.log('Отправил')
    }
}

export = ProcessMessage;