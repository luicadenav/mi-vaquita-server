import { StatusCodes } from "http-status-codes";
import { GroupsService } from "../services/groups.service.js";
import {
  GroupSchema,
  queryGroupSchema,
} from "../validations/groups.schema.validation.js";

const GroupsController = () => {
  const groupsService = GroupsService();

  const getGroups = async (req, res) => {
    const { error, value } = queryGroupSchema.validate(req.query, {
      abortEarly: false,
    });

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }

    try {
      const groups = await groupsService.getGroups(value);
      return res.status(StatusCodes.OK).json({
        groups,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  };

  const getById = async (req, res) => {
    try {
      const group = await groupsService.getById(req.params.id);

      if (!group) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `Group with id ${req.params.id} does not exist`,
        });
      }

      return res.status(StatusCodes.OK).json({
        group,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  };

  const createGroup = async (req, res) => {
    const { error, value } = GroupSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }

    const sanitizedBody = {
      ...value,
      ownerUserId: req.user.id,
    };

    try {
      const group = await groupsService.createGroup(sanitizedBody);
      if (group) {
        return res.status(StatusCodes.CREATED).json(group);
      } else {
        return res.status(StatusCodes.CONFLICT).json("an error ocurred");
      }
    } catch (error) {
      return res
        .status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  };

  const deleteById = async (req, res) => {
    try {
      const removed = await groupsService.deleteById(req.params.id);
      if (removed) {
        return res.status(StatusCodes.NO_CONTENT).send();
      }
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `Group with id ${req.params.id} does not exist`,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  };

  const updateGroup = async (req, res) => {
    const { error, value } = createGroupSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }

    try {
      const groupEdited = await groupsService.updateGroup(req.params.id, value);
      if (groupEdited) {
        return res.status(StatusCodes.OK).json({ groupEdited });
      } else {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ message: `an error ocurred` });
      }
    } catch (error) {
      return res
        .status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  };

  return {
    getGroups,
    createGroup,
    getById,
    deleteById,
    updateGroup,
  };
};

export { GroupsController };
