import { Model } from "../lib/model.js";

const GroupsService = () => {
  const groupsModel = Model();

  const getGroups = () => {
    return groupsModel.getGroups();
  };

  const createGroup = async (newGroup) => {
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

  return {
    getGroups,
    createGroup,
    getById,
  };
};

export { GroupsService };
