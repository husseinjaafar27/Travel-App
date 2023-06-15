import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.expiresIn,
  });
  return token;
};

export const register = async (req, res) => {
  const { username, email, password, photo, role } = req.body;
  try {
    if (!email) return res.status(400).json({ message: "Email is required!" });
    const user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: "Email already exists!" });

    if (!username)
      return res.status(400).json({ message: "Username is required!" });
    if (!password)
      return res.status(400).json({ message: "Password is required!" });
    if (password.length < 6)
      return res.status(400).json({
        message: "Password must be gratear then or equal to 6 Characters!",
      });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      photo,
      role,
    });

    const token = signToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    return res.status(200).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const { password, role, ...others } = user.dataValues;
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({
      token,
      data: { ...others },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
