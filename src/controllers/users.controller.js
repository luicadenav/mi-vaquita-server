import { UsersService } from "../services/users.service.js";

const UsersController = () => {
  const usersService = UsersService();

  const getUsers = async (_req, res) => {
    const users = await usersService.getUsers();
    return res.status(200).json({
      users,
    });
  };

  const createUser = async (req, res) => {
    const createdUser = await usersService.createUser(req.body);
    return res.status(200).json(createdUser);
  };

  return {
    getUsers,
    createUser,
  };
};
export { UsersController };
