import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Review = sequelize.define(
  "reviews",
  {
    tour_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "tours",
        key: "id",
      },
    },
    username: {
      type: DataTypes.STRING,
    },
    reviewText: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);

export default Review;
