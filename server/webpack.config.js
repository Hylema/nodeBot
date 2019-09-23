module.exports = {
    resolve: {
        alias: {
            Fetch_message: path.resolve(__dirname, './src/Fetch_message'),
            General_class: path.resolve(__dirname, './src/General_class'),
            Bot: path.resolve(__dirname, './bot/Bot'),
            Conversations: path.resolve(__dirname, './bot/conversations'),
            // Message_data: path.resolve(__dirname, './bot/data/message-data'),
            // Users_data: path.resolve(__dirname, './bot/data/users-data'),
        }
    }
};