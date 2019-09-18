const config = require('config');
const fs = require('fs');
const General_class = require('../src/General_class');

const allClasses = {
    Default: require('./classes/Default'),
    Commands: require('./classes/Commands'),
    Greetings: require('./classes/Greetings'),
};

class Bot extends General_class{
    private MESSAGE: string;
    private CHAT_ID: number;

    private CONVERSATION_USER_PATH: string;

    constructor(message: string, chat_id: number){
        super();
        this.MESSAGE = message;
        this.CHAT_ID = chat_id;

        this.checkUserConversations();
    }

    /**
     * Метод, который проверяет существует ли пользователь
     */
    //TODO нужно будет поменять код если конверсейшен будет пустым
    private checkUserConversations(): void {
        let value: any = fs.readdirSync('bot/conversations');
        let newUser: boolean = true;

        this.CONVERSATION_USER_PATH = `bot/conversations/${this.CHAT_ID}.json`;

        if(value.length !== 0){
            value.forEach( (value, key) => {
                if(value === `${this.CHAT_ID}.json`) {
                    newUser = false;
                }
            });
        }

        if(newUser){
            this.createNewUser();
        } else {
            this.createClass();
        }
    }

    /**
     * Метод, который создает JSON файл с новым пользователем, а затем отправляет на класс конверсейшена
     */
    private createNewUser(): void {
        const NEW_USER = config.get('NEW_USER');

        this.saveFile(this.CONVERSATION_USER_PATH, NEW_USER);

        this.createClass();
    }

    /**
     * Метод принимает конверсейшен пользователя и направляет на нужный класс
     */
    //TODO проверка работает не совсем верно
    private createClass(): void{
        const conversation: string = this.conversationGet('conversation');
        const classes: any = fs.readdirSync('bot/classes');

        if(typeof classes[conversation] !== undefined){
            const classForUser = require(`./classes/${conversation}.ts`);

            new classForUser(this);
        }
    }

    /**
     * Метод принимает ключ объекта и возваращет значение нужного пользователя
     * @param key
     */
    private conversationGet(key: string): any {
        const conversationUser: any = this.readFile(this.CONVERSATION_USER_PATH);

        return conversationUser[key];
    }
}

export = Bot;