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

const expenses = [
  {
    id_group: 1,
    participants_id: [],
    cost: 5000,
  },
];

const getGroups = () => {
  return groupsDB;
};

const createGroup = (groupToCreate) => {
  groupsDB.push({
    name: groupToCreate.name,
    color: groupToCreate.color,
  });
  return groupToCreate;
};

const getGroup = (group) => {};

export default { getGroups, createGroup };
