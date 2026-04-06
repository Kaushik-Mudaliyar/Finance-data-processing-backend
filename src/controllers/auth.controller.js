import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
async function loginUser(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required to login" });
  }
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  return res.status(200).json({ message: "User logged in successfully" });
}

export { loginUser };
