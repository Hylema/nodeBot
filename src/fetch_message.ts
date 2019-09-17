const request   = require('request');
const parse     = require('./parse_message.js');
const config    = require('config');
const fs        = require('fs');

const interval = setInterval((): void => {

    let offset = getOffset();

    const BOT_TOKEN: string = config.get('BOT_TOKEN');

    request({
        method: 'GET',
        url: `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`,
        qs: {
            offset: offset.offset
        }
    }, function (error: any, response: any, message: any) {
        if (!error && response.statusCode === 200) {
            let messageBag = JSON.parse(message);
            messageBag = messageBag.result;

            console.log(offset.offset, 'Оффсет сейчас равен');

            console.log(message);

            if(messageBag.length !== 0){
                offset.offset = messageBag[messageBag.length - 1].update_id + 1;
                setOffset(offset);
                addMessage(messageBag);
                parse.message();
                deleteAllMessage();
            }
        }
    });

}, 5000);

function getOffset(){
    return JSON.parse(fs.readFileSync('./bot/data/offset.json', 'utf8'));
}

function setOffset(offset: any): void {
    fs.writeFileSync('offset.json', JSON.stringify(offset))
}

function addMessage(newMassage: any): void {
    let messages: any = fs.readFileSync('./bot/data/users.json', 'utf8');
    messages = JSON.parse(messages);
    messages.push(...newMassage);
    messages = JSON.stringify(messages);
    fs.writeFileSync('users.json', messages);
}

function deleteAllMessage(): void {
    fs.writeFileSync('users.json', JSON.stringify([]));
}


