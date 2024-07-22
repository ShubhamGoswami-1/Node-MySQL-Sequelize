import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const sequelize = new Sequelize('testdb', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
// }, {
    // Choose one of the logging options
    // logging: console.log, // Default, displays the first parameter of the log function call
    // logging: (...msg) => console.log(msg), // Displays all log function call parameters
    // logging: false, // Disables logging
    // logging: msg => logger.debug(msg), // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
    // logging: logger.debug.bind(logger), // Alternative way to use custom logger, displays all messages
});

sequelize.options.logging = console.log;

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connecting successfully... !');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { sequelize, connectToDatabase };