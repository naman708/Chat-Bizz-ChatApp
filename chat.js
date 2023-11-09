const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Chat = sequelize.define('chat', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = Chat;