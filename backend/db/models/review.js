'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, {
        foriegnKey: 'userId',
      });
      Review.belongsTo(models.Spot, {
        foriegnKey: 'spotId',
      });
      // User.hasMany(model.SpotImage, {});       // #TODO add has many for bookings
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER, 
      validate: { min: 1, max: 5 }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};