'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Admin)
      Task.belongsToMany(models.User,{
        through:models.TaskUser,
        foreignKey:"TaskId"
      })
    }
  };
  Task.init({
    task_name: DataTypes.STRING,
    AdminId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};