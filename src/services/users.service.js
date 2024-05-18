import { UsersModel } from "../models/users.model.js";

const UsersService = () => {
  const usersModel = UsersModel();

  const getUsers = () => {
    return usersModel.getUsers();
  };

  const createUser = async (newUser) => {
    const createdUser = await usersModel.createUser(newUser);
    return {
      newUSer: createdUser,
      success: true,
      message: "user created successfully",
      code: 201,
    };
  };

  return {
    getUsers,
    createUser,
  };
};
export { UsersService };
