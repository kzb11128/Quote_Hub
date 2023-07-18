const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class UserQuote extends Model {}

UserQuote.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    quote_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quote',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_quote',
  }
);

module.exports = UserQuote;