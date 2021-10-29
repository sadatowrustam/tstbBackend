'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Member.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    pic: DataTypes.STRING,
    files:DataTypes.ARRAY(DataTypes.STRING),
    category:DataTypes.ARRAY(DataTypes.STRING),
    email:DataTypes.STRING,
    extra:DataTypes.STRING,
    welayat:DataTypes.STRING, 
    main:DataTypes.STRING
  }, {
    sequelize,
    tableName:"members",
    modelName: 'Member',
  });
  return Member;
};