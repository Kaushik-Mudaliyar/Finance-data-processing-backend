import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { apiResponse } from "../utils/apiResponse.js";
async function loginUser(req, res) {
  const { email } = req.body;

  if (!email) {
    apiResponse(res, 400, "Email is required to login");
  }
  const user = await userModel.findOne({ email: email });
  if (!user) {
    apiResponse(res, 404, "User does not exist");
  }
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  apiResponse(res, 200, "User logged in successfully");
}

export { loginUser };
