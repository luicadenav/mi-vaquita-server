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
    return res.status(200).json({
      group,
    });
  };

  const createGroup = async (req, res) => {
    const { name, color } = req.body;
    // validations ---
    //

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

  return {
    getGroups,
    createGroup,
    getById,
  };
};

export { GroupsController };
