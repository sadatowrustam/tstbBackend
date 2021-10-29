'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('provinces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid:{
        type:DataTypes.UUID,
        defaultvalue:DataTypes.UUIDV4
      },
      place: {
        type: DataTypes.JSONB
      },
      adress: {
        type: DataTypes.JSONB
      },
      phone: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      faks: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      email: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('provinces');
  }
};