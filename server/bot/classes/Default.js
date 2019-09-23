const request = require('request');
const config = require('config');
const fs = require('fs');
const ProcessMessage = require('../ProcessMessage');

class Default extends ProcessMessage{
    process(message) {
        this.sendMessage(`Урааааа я сижу в дефолет и вот сообщение:${message}`);

        this.changeState('conversations', 'Commands')
    }
}

module.exports = Default;