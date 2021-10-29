'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sponsor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sponsor.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    brandlogo: DataTypes.STRING,
    brandname: DataTypes.STRING,
    link: DataTypes.STRING,
    srok:DataTypes.STRING
  }, {
    sequelize,
    tableName:"sponsors",
    modelName: 'Sponsor',
  });
  return Sponsor;
};