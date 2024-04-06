import groupsService from '../services/groups.service.js';

const getGroups = (req, res) => {
  const groups = groupsService.getGroups();
  res.json(groups);
};

const createGroup = (req, res) => {
  const groupToCreate = req.body;
  const createdGroup = groupsService.createGroup(groupToCreate);
  res.status(201).json(createdGroup);
};

export default { getGroups, createGroup };
