const request   = require('request');
const config    = require('config');
const fs        = require('fs');
const Bot       = require('../bot/Bot');

class Fetch_message {
    private USERS_JSON_PATH = './bot/data/users.json';
    private MESSAGE_DATA_JSON_PATH = './bot/data/message-data.json';

    private BOT_TOKEN: string = config.get('BOT_TOKEN');
    private MESSAGE_DATA: any = this.read(this.MESSAGE_DATA_JSON_PATH);
    private offset: number = this.messageDataGet('offset');

    private newMessageData: any;

    constructor(){
        this.startFetching();
    }

    /**
     * Метод, который принимает ключ объекта и возващает его значение. Сам объект хранится в файле.
     * @param key
     */
    private messageDataGet(key: string): any{
        try {
            return this.MESSAGE_DATA[key];
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Устанавливает оффсет последнео сообщения
     */
    private async setNewOffset() {
        const newOffset = this.newMessageData[this.newMessageData.length - 1].update_id + 1;
        this.save(this.MESSAGE_DATA_JSON_PATH, newOffset);
    }

    /**
     * Считывает данные из файла JSON и возвращает их
     * @param path
     * @param encoding
     */
    protected read(path: string, encoding: string = 'utf8'): any{
        try{
            return JSON.parse(fs.readFileSync(path, encoding))
        }catch (e) {
            console.log('Не получилось считать Json в методе read, класса Fetch_message');
        }
    }

    /**
     * Сохраняет данные по указанному пути
     * @param path
     * @param data
     */
    protected save(path: string, data: any): void{
        fs.writeFileSync(path, JSON.stringify(data));
    }

    /**
     * Записывает все сообщения и их данные в файл
     */
    //TODO Переписать сохранение данных в базу, а не в файл
    private async addMessage() {
        let messages: any = this.read(this.USERS_JSON_PATH);

        messages.push(...this.newMessageData);

        this.save(this.USERS_JSON_PATH, messages);
    }

    /**
     * Функция обрабатывает каждое сообщение, после чего удаляет их
     */
    //TODO Из базы они не будут удаляется, будет просто ставиться флаг
    private parseMessage(): void{
        let allMessage: any = this.read(this.USERS_JSON_PATH);

        console.log(allMessage, 'allMessage');

        allMessage.forEach( (value , key) => {
            new Bot(
                value.message.text,
                value.message.chat.id
            );
        })
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

//
// function deleteAllMessage(): void {
//     fs.writeFileSync('users.json', JSON.stringify([]));
// }

export = Fetch_message;
