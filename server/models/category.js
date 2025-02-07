'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Cuisine, {
        foreignKey: 'categoryId'
      })
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Category name is required'
        },
        notEmpty: {
          args: true,
          msg: 'Category name is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};