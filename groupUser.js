const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const GroupUser = sequelize.define('groupuser', {
  
  groupname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  
});

module.exports = GroupUser;