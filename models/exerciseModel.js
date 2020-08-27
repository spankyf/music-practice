"use strict";
const moment = require("moment");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exercise.init(
    {
      datetime: {
        type: DataTypes.DATE,
        allowNull: false,

        //primaryKey: true,
        // defaultValue: moment().format(moment.HTML5_FMT.DATETIME_LOCAL),
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mins: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      exercise: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      material: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        // allowNull: false,
      },
      instrument: {
        type: DataTypes.STRING,

        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },

    {
      hooks: {
        beforeCreate: (exercise, options) => {
          exercise.dataValues.material = JSON.parse(
            exercise.dataValues.material
          );
        },
      },
      sequelize,
      modelName: "Exercise",
    }
  );

  return Exercise;
};
