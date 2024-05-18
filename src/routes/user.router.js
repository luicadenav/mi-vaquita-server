import express from "express";
import { UsersController } from "../controllers/users.controller.js";

const UserRouter = () => {
  const usersController = UsersController();

  const router = express.Router();

  router.get("/", usersController.getUsers);
  router.post("/", usersController.createUser);

  return router;
};

export { UserRouter };
