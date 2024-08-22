'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Must be in email format'
          },
          notNull: {
            args: true,
            msg: 'Email is required'
          },
          notEmpty: {
            args: true,
            msg: 'Email is required'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Password is required'
          },
          notEmpty: {
            args: true,
            msg: 'Password is required'
          },
          min: {
            args: 5,
            msg: 'Password has to be minimal 5 characters'
          }
        },
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'Staff'
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};