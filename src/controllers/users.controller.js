import { UsersService } from "../services/users.service.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validations/users.schema.validation.js";
import { StatusCodes } from "http-status-codes";

const UsersController = () => {
  const usersService = UsersService();

  const getUsers = async (_req, res) => {
    try {
      const users = await usersService.getUsers();
      return res.status(StatusCodes.OK).json({
        users,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  };

  const getUserById = async (req, res) => {
    try {
      const user = await usersService.getUserById(req.params.id);
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `Group with id ${req.params.id} does not exist`,
        });
      }

      return res.status(StatusCodes.OK).json({
        user,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  };

  const createUser = async (req, res) => {
    const { error, value } = createUserSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }
    try {
      const createdUser = await usersService.createUser(value);
      return res.status(StatusCodes.CREATED).json(createdUser);
    } catch (error) {
      return res
        .status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  };

  const deleteUserById = async (req, res) => {
    try {
      const isRemoved = await usersService.deleteUserById(req.params.id);

      if (!isRemoved) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: `user with id ${req.params.id} does not exist` });
      }
      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  };

  const editUserById = async (req, res) => {
    const { error, value } = updateUserSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }

    try {
      const userEdited = await usersService.editUserById(req.params.id, value);
      if (userEdited) {
        return res.status(StatusCodes.OK).json({ userEdited });
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ menssage: `an error has ocurred` });
      }
    } catch (error) {
      return res
        .status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
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
