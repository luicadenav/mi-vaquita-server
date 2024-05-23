import { UsersService } from "../services/users.service.js";
import usersSchemaValidation from "../validations/users.schema.validation.js";
import { StatusCodes } from "http-status-codes";

const UsersController = () => {
  const usersService = UsersService();

  const getUsers = async (_req, res) => {
    const users = await usersService.getUsers();
    return res.status(StatusCodes.OK).json({
      users,
    });
  };

  const getUserById = async (req, res) => {
    const user = await usersService.getUserById(req.params.id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `Group with id ${req.params.id} does not exist`,
      });
    }

    return res.status(StatusCodes.OK).json({
      user,
    });
  };

  const createUser = async (req, res) => {
    const { error, value } = usersSchemaValidation.validate(req.body, {
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
    const isRemoved = await usersService.deleteUserById(req.params.id);
    if (!isRemoved) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `user with id ${req.params.id} does not exist` });
    }
    return res.status(StatusCodes.NO_CONTENT).send();
  };

  const editUserById = async (req, res) => {
    // validaciones con joi!!!!!

    try {
      const userEdited = await usersService.editUserById(
        req.params.id,
        req.body
      );
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
