'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cuisine.belongsTo(models.User, {
        foreignKey: 'authorId'
      })
      Cuisine.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      })
    }
  }
  Cuisine.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Cuisine name is required'
        },
        notEmpty: {
          args: true,
          msg: 'Cuisine name is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Cuisine description is required'
        },
        notEmpty: {
          args: true,
          msg: 'Cuisine description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Cuisine price is required'
        },
        notEmpty: {
          args: true,
          msg: 'Cuisine price is required'
        },
        min: {
          args: 5000,
          msg: 'Minimum value of cuisine price is 5000'
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Cuisine imgUrl is required'
        },
        notEmpty: {
          args: true,
          msg: 'Cuisine imgUrl is required'
        },
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Cuisine categoryId is required'
        },
        notEmpty: {
          args: true,
          msg: 'Cuisine categoryId is required'
        },
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Cuisine authorId is required'
        },
        notEmpty: {
          args: true,
          msg: 'Cuisine authorId is required'
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Cuisine',
  });
  return Cuisine;
};