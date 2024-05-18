import connection from "../lib/connection.js";

const UsersModel = () => {
  const getUsers = async () => {
    const client = await connection.connect();
    const res = await client.query("SELECT * FROM users");
    client.release();

    return res.rows;
  };
  return {
    getUsers,
  };
};
export { UsersModel };
