const User = require('./User');
const Quote = require('./Quote');
const UserQuote = require('./UserQuote');

// Quotes belong to multiple Users
Quote.belongsToMany(UserQuote, {
  foreignKey: 'user_id',
});

// User can have multiple Quotes
User.hasMany(UserQuote, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Quote, UserQuote };
