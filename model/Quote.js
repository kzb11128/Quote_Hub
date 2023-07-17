const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Quote extends Model {}

Quote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    quote_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add after MVP achieved

    // category: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'quote',
  }
);

module.exports = Quote;
