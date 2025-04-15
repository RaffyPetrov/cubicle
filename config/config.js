const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb://localhost:27017/'
},
    production: {
        PORT: 80,
        DB_CONNECTION: 'mongodb+srv://admin:db_pass>@cluster0.m6oqkak.mongodb.net/'
    }
};

module.exports = config[process.env.NODE_ENV.trim()];