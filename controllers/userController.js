import User from "../models/User.js";

export const updateUser = async (req, res) => {
  const { id } = req.user;
  const { username, photo, role } = req.body;

  try {
    await User.update({ username, photo, role }, { where: { id: id } });

    const user = await User.findByPk(id);

    return res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "failed to update. Try again" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.user;

  try {
    await User.destroy(id);
    return res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "failed to delete. Try again" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({
      success: true,
      message: "Successful",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({});
    if (users.length < 1)
      return res.status(404).json({ message: "No users to show" });

    return res.status(200).json({
      success: true,
      count: users.length,
      message: "Successful",
      data: users,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
