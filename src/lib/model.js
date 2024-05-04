import connection from "./connection.js";

const Model = () => {
  const getGroups = async () => {
    const client = await connection.connect();
    const res = await client.query("SELECT * from groups");
    console.log("hola", res.rows);
    console.log(4.1, "[Database] Model findMany");
    client.release();
    return res.rows;
  };

  const createGroup = async (entity) => {
    const client = await connection.connect();
    const res = await client.query(
      "INSERT INTO GROUPS (owneruserid, name, color, CREATEDAT) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [entity.ownerUserId, entity.name, entity.color]
    );
    client.release();
    return res.rows[0];
  };

  const getById = async (id) => {
    const client = await connection.connect();
    const res = await client.query("SELECT * FROM groups WHERE  id = $1", [id]);
    console.log(res);
    client.release();
    return res.rows[0];
  };

  return {
    getGroups,
    createGroup,
    getById,
  };
};

export { Model };
