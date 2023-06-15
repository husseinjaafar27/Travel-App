import User from "../models/User.js";
import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const create = async (req, res) => {
  const { tourID } = req.params;
  const { reviewText, rating } = req.body;
  const { id } = req.user;
  try {
    const tour = await Tour.findByPk(tourID);
    if (!tour) return res.status(404).json({ message: "No tour found" });
    const user = await User.findByPk(id);
    const review = await Review.create({
      tour_id: tourID,
      username: user.username,
      reviewText,
      rating,
    });
    return res
      .status(200)
      .json({ message: "Review created successfully", data: review });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  const { reviewID } = req.params;
  try {
    const review = await Review.findByPk(reviewID);
    if (!review) return res.status(404).json({ message: "No review found" });
    await Review.update(req.body, { where: { id: reviewID } });

    return res.status(200).json({ message: "Review updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: { model: Tour, attributes: ["id"] },
      limit: 2,
      attributes: ["id"],
    });
    if (reviews.length < 1)
      return res.status(404).json({ message: "No reviews found" });

    return res.status(200).json({ message: "Review List", data: reviews });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getReview = async (req, res) => {
  const { reviewID } = req.params;
  try {
    const review = await Review.findOne({
      where: { id: reviewID },
      include: { model: Tour },
      limit: 5,
      attributes: ["id"],
    });
    if (!review) return res.status(404).json({ message: "No review found" });

    return res.status(200).json({ data: review });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
