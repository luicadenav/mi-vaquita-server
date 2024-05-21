import connection from "../lib/connection.js";

const Model = () => {
  const getGroups = async () => {
    const client = await connection.connect();
    const res = await client.query("SELECT * from groups");
    client.release();
    return res.rows;
  };

  const createGroup = async (entity) => {
    const client = await connection.connect();
    const res = await client.query(
      "INSERT INTO Groups ( name, color, ownerUserId, createdAt) VALUES ( $1, $2 , $3, NOW()) RETURNING *",
      [entity.name, entity.color, entity.ownerUserId]
    );
    client.release();
    return res.rows[0];
  };

  const getById = async (id) => {
    const client = await connection.connect();
    const res = await client.query("SELECT * FROM groups WHERE  id = $1", [id]);
    client.release();
    return res.rows[0];
  };

  const findByName = async (name) => {
    const client = await connection.connect();
    const res = await client.query(
      "SELECT COUNT(*) FROM groups WHERE  name = $1",
      [name]
    );
    client.release();

    return res.rows[0].count > 0;
  };

  const deleteById = async (id) => {
    const client = await connection.connect();
    const res = await client.query("DELETE FROM GROUPS WHERE ID = $1", [id]);
    client.release();
    return res.rowCount >= 1;
  };

  const updateGroup = async (id, value) => {
    const client = await connection.connect();
    const res = await client.query(
      "UPDATE groups SET name = $1 , color = $2 WHERE id = $3 RETURNING *",
      [value.name, value.color, id]
    );
    return res.rows[0];
  };

  return {
    getGroups,
    createGroup,
    getById,
    findByName,
    deleteById,
    updateGroup,
  };
};

export { Model };
