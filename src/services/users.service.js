import { UsersModel } from "../models/users.model.js";

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
      return {
        newUser: null,
        success: false,
        message: "The user already exists",
        code: 409,
      };
    }

    const createdUser = await usersModel.createUser(newUser);
    return {
      newUSer: createdUser,
      success: true,
      message: "user created successfully",
      code: 201,
    };
  };

  const deleteUserById = (id) => {
    return usersModel.deleteUserById(id);
  };
  const editUserById = (id, value) => {
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
