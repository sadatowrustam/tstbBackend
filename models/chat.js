'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Chat.init({
    chat: DataTypes.JSONB,
    user: DataTypes.STRING,
    isRead:DataTypes.STRING,
    lastId:DataTypes.STRING,
  }, {
    sequelize,
    tableName:"chats",
    modelName: 'Chat',
  });
  return Chat;
};