import { UsersModel } from "../models/users.model.js";

const UsersService = () => {
  const usersModel = UsersModel();

  const getUsers = () => {
    return usersModel.getUsers();
  };

  return {
    getUsers,
  };
};
export { UsersService };
