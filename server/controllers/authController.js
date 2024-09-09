import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const register = async (req, res) => {
  try {
    const { password, userName } = req.body;
    const exist = await User.findOne({ userName });
    if (exist) {
      return res.json({ message: "userName already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    req.body.password = hashPassword;
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3d",
    });
    res.status(201).json({ user, token, stauts: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "UserName not found!" });
    }

    if (password && user.password) {
      const compared = await bcrypt.compare(password, user.password);
      if (compared) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "3d",
        });
        res.status(200).json({
          Data: user,
          status: true,
          err: null,
          token,
        });
      } else {
        res.status(400).json({ message: "Incorrect password!" });
      }
    } else {
      res.status(400).json({ message: "Password is missing!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export { register, login };
