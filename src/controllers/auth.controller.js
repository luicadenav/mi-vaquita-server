import { UsersService } from "../services/users.service.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AuthController = () => {
  const userService = UsersService();

  const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);
    const isValidToken = await bcrypt.compare(password, user.password);

    if (!user || !isValidToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "invalid credentials" });
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(StatusCodes.OK).json({ token });
  };
  return {
    login,
  };
};
export { AuthController };
