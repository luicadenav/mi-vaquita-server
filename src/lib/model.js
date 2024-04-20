const Model = () => {
  const entities = [];

  const getGroups = () => {
    console.log(4.1, '[Database] Model findMany');

    return entities;
  };

  const createGroup = (entity) => {
    const maxId = entities.reduce((max, { id }) => Math.max(max, id), 0);
    const newId = (maxId + 1).toString();
    const newEntity = {
      ...entity,
      id: newId,
    };
    entities.push(newEntity);
    return newEntity;
  };

  return {
    getGroups,
    createGroup,
  };
};

export { Model };
