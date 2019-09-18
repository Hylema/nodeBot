const request   = require('request');
const fs        = require('fs');
const Bot       = require('../bot/Bot');
const General_class = require('./General_class');

class Fetch_message extends General_class{
    private USERS_JSON_PATH = './bot/data/users-data.json';
    private MESSAGE_DATA_JSON_PATH = './bot/data/message-data.json';

    private offset: number = this.messageDataGet('offset');

    private messageData: any;
    private newMessageData: any;

    constructor(){
        super();
        this.startFetching();
    }

    /**
     * Метод, который принимает ключ объекта и возващает его значение. Сам объект хранится в файле.
     * @param key
     */
    private messageDataGet(key: string): any{
        this.messageData = this.readFile(this.MESSAGE_DATA_JSON_PATH);

        try {
            return this.messageData[key];
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Устанавливает оффсет последнео сообщения
     */
    private async setNewOffset() {
        this.messageData['offset'] = this.newMessageData[this.newMessageData.length - 1].update_id + 1;

        this.saveFile(this.MESSAGE_DATA_JSON_PATH, this.messageData);
    }

    /**
     * Записывает все сообщения и их данные в файл
     */
    //TODO Переписать сохранение данных в базу, а не в файл
    private async addMessage() {
        let messages: any = this.readFile(this.USERS_JSON_PATH);

        messages.push(...this.newMessageData);

        this.saveFile(this.USERS_JSON_PATH, messages);
    }

    /**
     * Метод обрабатывает каждое сообщение, после чего удаляет их
     */
    //TODO Из базы они не будут удаляется, будет просто ставиться флаг
    private parseMessage(): void{
        let allMessage: any = this.readFile(this.USERS_JSON_PATH);

        allMessage.forEach( (value , key) => {
            new Bot(
                value.message.text,
                value.message.chat.id
            );
        });

        this.saveFile(this.USERS_JSON_PATH, []);
    }

    /**
     * Основная зациклинная функция, которая каждые 5 секунд отправляет запрос на проверку новых сообщений отправленные боту
     */
    private startFetching(): void{
        const interval = setInterval((): void => {

            request({
                method: 'GET',
                url: `https://api.telegram.org/bot${this.BOT_TOKEN}/getUpdates`,
                qs: {
                    offset: this.offset
                }
            }, (error: any, response: any, message: any)  => {
                if (!error && response.statusCode === 200) {
                    this.newMessageData = JSON.parse(message).result;

                    console.log(this.offset, 'Оффсет сейчас равен');

                    if(this.newMessageData.length > 0){
                        console.info('Получил новые сообщения');

                        this.setNewOffset().then(() => {
                            this.addMessage().then(() => {
                                this.parseMessage();
                            });
                        });
                    }
                }
            });

        }, 5000);
    }
}

export = Fetch_message;
