import connection from "../lib/connection.js";

const UsersModel = () => {
  const getUsers = async () => {
    const client = await connection.connect();
    const res = await client.query("SELECT * FROM users");
    client.release();

    return res.rows;
  };

  const createUser = async (newUser) => {
    const client = await connection.connect();
    const { name, email, password } = newUser;
    const res = await client.query(
      "INSERT INTO Users (name, email, password, createdat) VALUES ($1, $2, $3,NOW()) RETURNING *",
      [name, email, password]
    );
    client.release();
    return res[0];
  };

  return {
    getUsers,
    createUser,
  };
};
export { UsersModel };
