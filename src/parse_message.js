const fs = require('fs');
const Bot = require('../bot/Bot');

module.exports.message = function(){
    let allMessage = JSON.parse(getAllMessage());

    allMessage.forEach(function (value, key) {
        let chat_id = value.message.chat.id;
        let message = value.message.text;

        new Bot(message ,chat_id).checkDirConversations();
    })
};

function getAllMessage() {
    return fs.readFileSync('users.json', 'utf8');
}





