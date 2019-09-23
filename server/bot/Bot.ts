const config = require('config');
const fs = require('fs');
const General_class = require('./General_class');

const classForUser = {
    Default: require('./classes/Default.js'),
    Commands: require('./classes/Commands.js'),
    Greetings: require('./classes/Greetings.ts'),
};

interface conversationInterface {
    conversation: string,
    state: number
}

//TODO Пути к файлам
//TODO Проверить, есть ли возможность подключать файлы на ходу
class Bot extends General_class{
    private MESSAGE: string;
    private CHAT_ID: number;

    private _conversation: conversationInterface;

    private _allConversations: any[];
    private _allClasses: any[];

    constructor(message: string, chat_id: number){
        super();

        this.MESSAGE = message;
        this.CHAT_ID = chat_id;

        this.checkUserConversations();
    }

    get conversation(): conversationInterface {
        if(this._conversation === undefined){
            this.conversation = this.readFile(this.CONVERSATION_USER_PATH);
        }

        return this._conversation;
    }
    set conversation(newConversation: conversationInterface){
        this._conversation = newConversation;

        this.saveFile(this.CONVERSATION_USER_PATH, this.conversation)
    }

    get allConversations():any[] {
        if(this._allConversations === undefined){
            this.allConversations = fs.readdirSync('bot/conversations');
        }

        return this._allConversations;
    }
    set allConversations(arrayConversations: any[]){
        this._allConversations = arrayConversations;
    }

    get allClasses():any[] {
        if(this._allClasses === undefined){
            this.allClasses = fs.readdirSync('bot/classes').map(filename => {
                return filename.split('.')[0];
            });
        }

        return this._allClasses;
    }
    set allClasses(arrayConversations: any[]){
        this._allClasses = arrayConversations;
    }

    get CONVERSATION_USER_PATH(): string {
        return `bot/conversations/${this.CHAT_ID}.json`;
    }


    /**
     * Метод, который проверяет существует ли пользователь
     */
    private checkUserConversations(): void {

        let newUser: boolean = true;
        let allConversations: any[] = this.allConversations;

        if(allConversations.length !== 0){
            allConversations.forEach( (value, key) => {
                if(value === `${this.CHAT_ID}.json`) {
                    newUser = false;
                }
            });
        }

        newUser ? this.createNewUser() : this.createClass();
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
     * Метод смотрит конверсейшен пользователя и направляет на нужный класс
     */
    //TODO проверка работает не совсем верно
    private createClass(): void{
        const conversation: string = this.conversation['conversation'];
        const allClasses: any[] = this.allClasses;

        if(allClasses.indexOf(conversation) !== -1){
            //const classForUser: any = require(`./classes/${conversation}.ts`);

            new classForUser[conversation](this);
        } else {
            console.error('Такого класса не существует');
        }
    }
}

export = Bot;