import { Model } from '../lib/model.js';

const groupsDB = [
  {
    id: 1,
    name: 'Group # 1',
    color: ' #A65293',
  },
  {
    id: 2,
    name: 'Group # 2',
    color: ' #4F80A4',
  },
];

const GroupsService = () => {
  const groupsModel = Model();

  const getGroups = () => {
    return groupsModel.getGroups();
  };

  const createGroup = (groupToCreate) => {
    groupsDB.push({
      name: groupToCreate.name,
      color: groupToCreate.color,
    });

    return groupsModel.createGroup(groupToCreate);
  };

  return {
    getGroups,
    createGroup,
  };
};

export { GroupsService };
