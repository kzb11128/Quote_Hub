const sequelize = require("../config/connection");
// Require models
const { User, Quote, UserQuote }= require("../models");


const quoteSeedData = require("./quoteSeedData.json");
const userSeedData = require("./userSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  const quotes = await Quote.bulkCreate(quoteSeedData, {
    individualHooks: true,
    returning: true,
  });

 
  const userQuotes = await UserQuote.bulkCreate([
    { user_id: users[0].id, quote_id: quotes[0].id },
    { user_id: users[0].id, quote_id: quotes[1].id },
    { user_id: users[0].id, quote_id: quotes[2].id },
    { user_id: users[1].id, quote_id: quotes[5].id },
    { user_id: users[1].id, quote_id: quotes[6].id },
    { user_id: users[1].id, quote_id: quotes[7].id },
    { user_id: users[2].id, quote_id: quotes[3].id },
    { user_id: users[2].id, quote_id: quotes[6].id },
    { user_id: users[2].id, quote_id: quotes[9].id },
    { user_id: users[3].id, quote_id: quotes[15].id },
    { user_id: users[3].id, quote_id: quotes[16].id },
    { user_id: users[3].id, quote_id: quotes[17].id }
]);

  process.exit(0);
};

seedDatabase();
