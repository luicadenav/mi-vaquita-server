import { Model } from "../models/groups.model.js";

const GroupsService = () => {
  const groupsModel = Model();

  const getGroups = () => {
    return groupsModel.getGroups();
  };

  const createGroup = async (newGroup) => {
    const groupFound = await groupsModel.findByName(newGroup.name);

    const { name } = newGroup;

    if (name.length > 30) {
      return {
        newGroup: null,
        success: false,
        message: "The group name must be fewer than 30 characters.",
        code: 400,
      };
    }

    if (groupFound) {
      return {
        newGroup: null,
        success: false,
        message: "The group already exists",
        code: 409,
      };
    }

    const createdGroup = await groupsModel.createGroup(newGroup);

    return {
      newGroup: createdGroup,
      success: true,
      message: "Group created successfully",
      code: 201,
    };
  };

  const getById = (id) => {
    return groupsModel.getById(id);
  };

  const deleteById = (id) => {
    return groupsModel.deleteById(id);
  };

  return {
    getGroups,
    createGroup,
    getById,
    deleteById,
  };
};

export { GroupsService };
