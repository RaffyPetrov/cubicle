const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb://localhost:27017/',
        SALT_ROUNDS: 10,
        SECRET: 'navuhodonosor',
        COOKIE_NAME: 'USER_SESSION',

},
    production: {
        PORT: 80,
        DB_CONNECTION: 'insert here your production connection string',
        SALT_ROUNDS: 10,
        SECRET: 'navuhodonosor',
        COOKIE_NAME: 'USER_SESSION',
    }
};

module.exports = config[process.env.NODE_ENV.trim()];