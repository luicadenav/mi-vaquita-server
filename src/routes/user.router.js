import express from "express";
import { UsersController } from "../controllers/users.controller.js";

const UserRouter = () => {
  const usersController = UsersController();

  const router = express.Router();

  router.get("/", usersController.getUsers);
  router.get("/:id", usersController.getUserById);
  router.post("/", usersController.createUser);
  router.delete("/:id", usersController.deleteUserById);
  router.put("/:id", usersController.editUserById);

  return router;
};

export { UserRouter };
