const request = require('request');
const config = require('config');
const fs = require('fs');
const Fetch_message = require('../src/Fetch_message');

const allClasses = {
    Default: require('./сlasses/Default'),
    Commands: require('./сlasses/Commands'),
    Greetings: require('./сlasses/Greetings'),
};

class Bot extends Fetch_message{
    private MESSAGE: string;
    private CHAT_ID: number;

    private CONVERSATION_PATH: string = `conversations/${this.CHAT_ID}.json`;

    constructor(message, chat_id){
        super();
        this.MESSAGE = message;
        this.CHAT_ID = chat_id;

        this.checkConversations();
    }

    //TODO нужно будет поменять код если конверсейшен будет пустым
    checkConversations() {
        let value = fs.readdirSync('conversations');

        if(value.length !== 0){
            value.forEach( (value, key) => {
                if(value === `${this.CHAT_ID}.json`){
                    let file = this.read(this.CONVERSATION_PATH);
                    this.createClass(file.conversation);
                } else {
                    const NEW_USER = config.get('NEW_USER');
                    this.save(this.CONVERSATION_PATH, NEW_USER);
                    this.createClass(NEW_USER.conversation);
                }
            });
        }
    }

    createClass(conversation){
        new allClasses[conversation](this);
    }

    changeState(name, param){
        let file = this.read(this.CONVERSATION_PATH);
        file[name] = param;
        file['state'] = 0;
        this.save(this.CONVERSATION_PATH, file);
    }
}

export = Bot;