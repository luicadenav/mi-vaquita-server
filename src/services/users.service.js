import { UsersModel } from "../models/users.model.js";
import ConflictException from "../exceptions/conflict.exception.js";
import NotFoundException from "../exceptions/not-found.exception.js";

const UsersService = () => {
  const usersModel = UsersModel();

  const getUsers = () => {
    return usersModel.getUsers();
  };

  const getUserById = async (id) => {
    return usersModel.getUserById(id);
  };

  const createUser = async (newUser) => {
    const { email } = newUser;
    const userFound = await usersModel.findUserByEmail(email);
    if (userFound) {
      throw new ConflictException("the user already exists");
    }
    return usersModel.createUser(newUser);
  };

  const deleteUserById = (id) => {
    return usersModel.deleteUserById(id);
  };

  const editUserById = async (id, value) => {
    const userFound = await usersModel.getUserById(id);
    if (!userFound) {
      throw new NotFoundException(`user with id: ${id} not found`);
    }
    return usersModel.editUserById(id, value);
  };

  return {
    getUsers,
    createUser,
    getUserById,
    deleteUserById,
    editUserById,
  };
};
export { UsersService };
