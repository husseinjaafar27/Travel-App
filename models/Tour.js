import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Tour = sequelize.define(
  "tours",
  {
    title: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    distance: {
      type: DataTypes.INTEGER,
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: "default",
    },
    desc: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    maxGroupSize: {
      type: DataTypes.INTEGER,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true }
);

export default Tour;
