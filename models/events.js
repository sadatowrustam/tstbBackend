'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Events.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    pic: DataTypes.STRING,
    name: DataTypes.JSONB,
    title: DataTypes.JSONB,
    date: DataTypes.JSONB,
    body: DataTypes.JSONB,
    tags:DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    tableName:"events",
    modelName: 'Events',
  });
  return Events;
};