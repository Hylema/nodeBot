const fs        = require('fs');
const config    = require('config');

/**
 * Класс для общих методов
 */
abstract class General_class {

    protected BOT_TOKEN: string = config.get('BOT_TOKEN');

    /**
     * Считывает данные из файла JSON и возвращает их
     * @param path
     * @param encoding
     */
    protected readFile(path: string, encoding: string = 'utf8'): any{
        try{
            return JSON.parse(fs.readFileSync(path, encoding))
        }catch (e) {
            console.log('Не получилось считать Json');
        }
    }

    /**
     * Сохраняет данные по указанному пути
     * @param path
     * @param data
     */
    protected saveFile(path: string, data: any): void{
        fs.writeFileSync(path, JSON.stringify(data));
    }

    /**
     * Возвращает массив документов, которые хранятся в папке
     * @param path
     */
    protected readDir(path: string): any{

    }
}

export = General_class