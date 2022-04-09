const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Standard extends Model {}

Standard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Standard: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'standard',
  }
);

module.exports = Standard;
