const sequelize = require("../config/connection");
// Require models
const User = require("../models/User");
const Quote = require("../models/Quote");

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

  process.exit(0);
};

seedDatabase();
