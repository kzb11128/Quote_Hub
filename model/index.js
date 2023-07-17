const User = require('./User');
const Quote = require('./Quote');
const UserQuote = require('./UserQuote');

// Quotes belong to multiple Users
Quote.belongsToMany(User, {
    through: {
      model: UserQuote,
      unique: false,
    },
});

// User can have multiple Quotes
User.belongsToMany(Quote, {
  through: {
    model: UserQuote,
    unique: false,
  },
});

module.exports = { User, Quote, UserQuote };
