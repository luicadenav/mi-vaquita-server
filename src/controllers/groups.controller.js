import { GroupsService } from "../services/groups.service.js";

const GroupsController = () => {
  const groupsService = GroupsService();

  const getGroups = async (_req, res) => {
    const groups = await groupsService.getGroups();
    return res.status(200).json({
      groups,
    });
  };

  const getById = async (req, res) => {
    const group = await groupsService.getById(req.params.id);

    if (!group) {
      return res
        .status(404)
        .json({ message: `Group with id ${req.params.id} does not exist` });
    }

    return res.status(200).json({
      group,
    });
  };

  const createGroup = async (req, res) => {
    const { name, color } = req.body;
    // validations -------
    if (!name || !color) {
      return res.status(400).json({ message: "the field is missing" });
    }

    if (typeof name != "string") {
      return res.status(400).json({
        message: "the field should be a string",
      });
    }

    if (!name.trim()) {
      return res.status(400).json({
        message: "the field can not be  empty",
      });
    }

    if (typeof color != "string") {
      return res.status(400).json({
        message: "the field should be a string",
      });
    }

    if (!color.trim()) {
      return res.status(400).json({
        message: "the field can not be  empty",
      });
    }

    //-----------------------------

    const sanitizedBody = {
      name: name.trim(),
      color: color.trim(),
      ownerUserId: 1,
    };

    const { newGroup, success, message, code } =
      await groupsService.createGroup(sanitizedBody);

    if (success) {
      return res.status(code).json(newGroup);
    } else {
      return res.status(code).json(message);
    }
  };

  const deleteById = async (req, res) => {
    const removed = await groupsService.deleteById(req.params.id);

    if (removed) {
      return res.status(204).send();
    }

    return res.status(404).json({
      message: `Group with id ${req.params.id} does not exist`,
    });
  };

  const updateGroup = async (req, res) => {
    const removed = await groupsService.updateGroup(req.params.id, req.body);

    if (removed) {
      return res.status(200).json({ removed });
    } else {
      return res.status(402).json({ message: `an error ocurred` });
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
