import { UsersService } from "../services/users.service.js";

const UsersController = () => {
  const usersService = UsersService();

  const getUsers = async (_req, res) => {
    const users = await usersService.getUsers();
    return res.status(200).json({
      users,
    });
  };

  const getUserById = async (req, res) => {
    const user = await usersService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `Group with id ${req.params.id} does not exist`,
      });
    }

    return res.status(200).json({
      user,
    });
  };

  const createUser = async (req, res) => {
    const createdUser = await usersService.createUser(req.body);
    return res.status(200).json(createdUser);
  };

  const deleteUserById = async (req, res) => {
    const isRemoved = await usersService.deleteUserById(req.params.id);
    if (!isRemoved) {
      return res
        .status(402)
        .json({ message: `user with id ${req.params.id} does not exist` });
    }
    return res
      .status(402)
      .json({ message: `user with id ${req.params.id} removed` });
  };

  const editUserById = async (req, res) => {
    const userEdited = await usersService.editUserById(req.params.id, req.body);
    if (userEdited) {
      return res.status(200).json({ userEdited });
    } else {
      return res.status(400).json({ menssage: "it couldn't be edited" });
    }
  };

  return {
    getUsers,
    createUser,
    getUserById,
    deleteUserById,
    editUserById,
  };
};

export { UsersController };
