const dotenv = require('dotenv');
const app = require('./app');
const { sequelize, connectToDatabase } = require('./database');

dotenv.config({ path: './config.env' });

const dbInitiative = async () => {
    await connectToDatabase();
    await sequelize.sync(); // Synchronize the models
};

dbInitiative();

// Function to start the server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running at 3000...!');
});
