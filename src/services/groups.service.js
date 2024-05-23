import { Model } from "../models/groups.model.js";
import ConflictException from "../exceptions/conflict.exception.js";
import NotFoundException from "../exceptions/not-found.exception.js";

const GroupsService = () => {
  const groupsModel = Model();

  const getGroups = (value) => {
    return groupsModel.getGroups(value);
  };

  const getById = (id) => {
    return groupsModel.getById(id);
  };

  const createGroup = async (newGroup) => {
    const { name } = newGroup;
    const groupFound = await groupsModel.findByName(name);
    if (groupFound) {
      throw new ConflictException("the group already exists");
    }
    return groupsModel.createGroup(newGroup);
  };

  const deleteById = (id) => {
    return groupsModel.deleteById(id);
  };

  const updateGroup = async (id, value) => {
    const groupFound = await groupsModel.getById(id);

    if (!groupFound) {
      throw new NotFoundException(`group with id: ${id} not found`);
    }
    return groupsModel.updateGroup(id, value);
  };

  return {
    getGroups,
    createGroup,
    getById,
    deleteById,
    updateGroup,
  };
};

export { GroupsService };
