import { GroupsService } from '../services/groups.service.js';

const GroupsController = () => {
  const groupsService = GroupsService();

  const getGroups = (req, res) => {
    const groups = groupsService.getGroups();
    res.json(groups);
  };

  const createGroup = (req, res) => {
    const groupToCreate = req.body;
    const createdGroup = groupsService.createGroup(groupToCreate);
    res.status(201).json(createdGroup);
  };

  return {
    getGroups,
    createGroup,
  };
};

export { GroupsController };
