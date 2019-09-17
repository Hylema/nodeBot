const fs        = require('fs');

/**
 * Класс для общиъ методов
 */
abstract class General_class {

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
}