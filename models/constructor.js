'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Constructor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Constructorcategory,{foreignKey:"constructorId",as:"category"});
    }
  };
  Constructor.init({
    name: DataTypes.JSONB,
    body: DataTypes.JSONB,
    page: DataTypes.STRING,
    constructorId:DataTypes.INTEGER
  }, {
    sequelize,
    tableName: "constructor",
    modelName: 'Constructor',
  });
  return Constructor;
};