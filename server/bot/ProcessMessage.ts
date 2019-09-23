const request = require('request');
const General_class = require('./General_class');

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

        // request({
        //     method: 'GET',
        //     url: `https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`,
        //     qs: {
        //         chat_id: this.bot.CHAT_ID,
        //         text: message
        //     }
        // }, () => {});

        // request
        //     .get(`https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`, {
        //     chat_id: this.bot.CHAT_ID,
        //     text: message
        // }, function(err,httpResponse,body){
        //         console.log(err);
        //         console.log(httpResponse);
        //         console.log(body);
        //     });


        console.log(message);
    }
}

export = ProcessMessage;