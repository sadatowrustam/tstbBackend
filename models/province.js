'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Province.init({
    uuid:{
      type:DataTypes.STRING,
      defaultValue:DataTypes.UUIDV4
    },
    place: DataTypes.JSONB,
    adress: DataTypes.JSONB,
    phone: DataTypes.ARRAY(DataTypes.STRING),
    faks: DataTypes.ARRAY(DataTypes.STRING),
    email: DataTypes.STRING,

  }, {
    sequelize,
    tableName:"provinces",
    modelName: 'Province',
  });
  return Province;
};