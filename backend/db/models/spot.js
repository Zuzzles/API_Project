'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        hooks: true,
        onDelete: 'CASCADE'
      });
      Spot.hasMany(models.Review, {
        foriegnKey: 'spotId',
        hooks: true,
        onDelete: 'CASCADE'
      })
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        max: 90,
        min: -90
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      validate: {
        max: 180,
        min: -180
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 50],
      }
    },
    description: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 0.01
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
    // defaultScope: {
    //   attributes: {
    //     exclude: ['createdAt', 'updatedAt'],
    //   }
    // }
  });
  return Spot;
};