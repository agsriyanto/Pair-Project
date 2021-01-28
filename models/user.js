'use strict';
const { enkrip } = require('../helper/enkrip')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Task,{
        through:models.TaskUser,
        foreignKey:"UserId"
      })
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate(instance) {
        instance.password = enkrip(instance.password)
      }
    },
    modelName: 'User'
  });
  return User;
};