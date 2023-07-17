const sequelize = require('../config/connection');
// Require models
const { Quote, User } = require('../model');


const quoteSeedData = require('./quoteSeedData.json');
const userSeedData = require('./userSeedData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData);
    const quotes = await Quote.bulkCreate(quoteSeedData);

    process.exit(0);
};

seedDatabase();