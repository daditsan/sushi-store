'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cuisines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
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
        },
        references: {
          model: 'Categories',
          key: 'id',
        }
      },
      authorId: {
        type: Sequelize.INTEGER,
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
        },
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cuisines');
  }
};