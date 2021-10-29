'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commerce extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Commerce.init({
    welayat: DataTypes.STRING,
    name: DataTypes.JSONB,
    number: DataTypes.STRING,
    website: DataTypes.STRING,
    pic: DataTypes.ARRAY(DataTypes.STRING),
    category:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Commerce',
  });
  return Commerce;
};