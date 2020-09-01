"use strict";
const moment = require("moment");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Seed.init(
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true,
        primaryKey: true,
        // defaultValue: moment().format(moment.HTML5_FMT.DATETIME_LOCAL),
      },
      state: {
        type: DataTypes.STRING(9000),
        allowNull: false,
      },
      seed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      // createdAt: {
      //   allowNull: false,
      //   type: DataTypes.DATE,
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: DataTypes.DATE,
      // },
    },

    {
      // hooks: {
      //   beforeCreate: (exercise, options) => {
      //     exercise.dataValues.material = JSON.parse(
      //       exercise.dataValues.material
      //     );
      //   },
      // },
      timestamps: false,
      sequelize,
      modelName: "Seed",
    }
  );

  return Seed;
};
