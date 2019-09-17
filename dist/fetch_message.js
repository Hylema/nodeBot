"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var parse = require("../src/parse_message.js");
var config = require("config");
var fs = require("fs");
var interval = setInterval(function () {
    var offset = getOffset();
    var BOT_TOKEN = config.get('BOT_TOKEN');
    request({
        method: 'GET',
        url: "https://api.telegram.org/bot" + BOT_TOKEN + "/getUpdates",
        qs: {
            offset: offset.offset
        }
    }, function (error, response, message) {
        if (!error && response.statusCode === 200) {
            var messageBag = JSON.parse(message);
            messageBag = messageBag.result;
            console.log(offset.offset, 'Оффсет сейчас равен');
            console.log(message);
            if (messageBag.length !== 0) {
                offset.offset = messageBag[messageBag.length - 1].update_id + 1;
                setOffset(offset);
                addMessage(messageBag);
                parse.message();
                deleteAllMessage();
            }
        }
    });
}, 5000);
function getOffset() {
    return JSON.parse(fs.readFileSync('offset.json', 'utf8'));
}
function setOffset(offset) {
    fs.writeFileSync('offset.json', JSON.stringify(offset));
}
function addMessage(newMassage) {
    var messages = fs.readFileSync('users.json', 'utf8');
    messages = JSON.parse(messages);
    console.log(messages);
    //messages.push(...newMassage);
    messages = JSON.stringify(messages);
    fs.writeFileSync('users.json', messages);
}
function deleteAllMessage() {
    fs.writeFileSync('users.json', JSON.stringify([]));
}
