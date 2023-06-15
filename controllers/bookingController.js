import Booking from "../models/Booking.js";
import User from "../models/User.js";

export const create = async (req, res) => {
  const { tourName, guestSize, phone } = req.body;
  const { id } = req.user;
  try {
    const user = await User.findByPk(id);
    const booking = await Booking.create({
      user_id: user.dataValues.id,
      userEmail: user.dataValues.email,
      fullName: user.dataValues.username,
      tourName,
      guestSize,
      phone,
      bookAt: Date.now(),
    });

    return res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: booking,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  const { bookID } = req.params;
  const { id } = req.user;
  try {
    const booking = await Booking.findOne({
      where: { id: bookID, user_id: id },
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    await Booking.destroy({ where: { id: booking.id } });

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  const { bookID } = req.params;
  const { id } = req.user;
  try {
    const booking = await Booking.findOne({
      where: { id: bookID, user_id: id },
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    await Booking.update(req.body, { where: { id: booking.id } });

    return res.status(200).json({ message: "Successfully updated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Booking.findByPk(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({
      success: true,
      message: "successfully ",
      data: book,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.findAll();

    return res.status(200).json({
      success: true,
      message: "successfuly",
      data: books,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
