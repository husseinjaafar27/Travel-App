import User from "./models/User.js";
import Booking from "./models/Booking.js";
import Tour from "./models/Tour.js";
import Review from "./models/Review.js";

//Tour - Review
Tour.hasMany(Review, {
  foreignKey: "tour_id",
});
Review.belongsTo(Tour, {
  foreignKey: "tour_id",
});
