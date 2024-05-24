import express from "express";
import { AuthController } from "../controllers/auth.controller.js";

const AuthRouter = () => {
  const authController = AuthController();

  const router = express.Router();

  router.post("/login", authController.login);

  return router;
};

export { AuthRouter };
