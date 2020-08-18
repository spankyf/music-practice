"use strict";
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
        unique: true,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mins: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      inversions: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      instrument: {
        type: DataTypes.ENUM({
          values: ["bass", "piano", "guitar", "vocals", "midi"],
        }),

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
      sequelize,
      modelName: "Exercise",
      // hooks: {
      //   afterFind: (sleep, options) => {
      //     console.log(sleep);
      //   },
      // },
    }
  );

  return Exercise;
};
