const User = require('./User');
const Quote = require('./Quote');


Quote.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Quote, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Quote };
