import getGroupsService from '../services/groups.service.js';

const groups = [
  {
    id: 1,
    name: 'group 1',
    color: ' #fffff',
  },
  {
    id: 2,
    name: 'group 2',
    color: ' #fffff',
  },
];

export const getGroups = (req, res) => {
  res.send(getGroupsService());
};

export default getGroups;
