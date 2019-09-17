const request = require('request');
const config = require('config');
const fs = require('fs');

const allClasses = {
    Default: require('./сlasses/Default'),
    Commands: require('./сlasses/Commands'),
    Greetings: require('./сlasses/Greetings'),
};

class Bot{
    constructor(message, chat_id){
        this.message = message;
        this.chat_id = chat_id;
    }

    //TODO нужно будет поменять код если конверсейшен будет пустым
    checkDirConversations() {
        let value = fs.readdirSync('conversations');

        if(value.length !== 0){
            value.forEach( (value, key) => {
                if(value === `${this.chat_id}.json`){
                    let file = this.read();
                    this.createClass(file.conversation);
                } else {
                    const NEW_USER = config.get('NEW_USER');
                    this.save(NEW_USER);
                    this.createClass(NEW_USER.conversation);
                }
            });
        }
    }

    createClass(conversation){
        new allClasses[conversation](this);
    }

    changeState(name, param){
        let file = this.read();
        file[name] = param;
        file['state'] = 0;
        this.save(file);
    }

    read(){
        let file = fs.readFileSync(`conversations/${this.chat_id}.json`, 'utf8');
        return JSON.parse(file);
    }

    save(file){
        fs.writeFileSync(`conversations/${this.chat_id}.json`, JSON.stringify(file), (err) => {});
    }
}

module.exports = Bot;