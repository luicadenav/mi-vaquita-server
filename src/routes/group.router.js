import express from "express";
import { GroupsController } from "../controllers/groups.controller.js";

const GroupRouter = () => {
  const groupsController = GroupsController();
  const registerRoutes = () => {
    const router = express.Router();
    router.get("/", groupsController.getGroups);
    router.get("/:id", groupsController.getById);
    router.post("/", groupsController.createGroup);
    router.delete("/:id", groupsController.deleteById);
    return router;
  };
  return {
    registerRoutes,
  };
};

export { GroupRouter };
