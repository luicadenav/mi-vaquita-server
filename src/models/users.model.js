import connection from "../lib/connection.js";
import bcrypt from "bcrypt";

const UsersModel = () => {
  const getUsers = async () => {
    const client = await connection.connect();
    const res = await client.query("SELECT * FROM users");
    client.release();

    return res.rows;
  };

  const getUserById = async (id) => {
    const client = await connection.connect();
    const res = await client.query("SELECT * FROM users WHERE  id = $1", [id]);
    client.release();
    return res.rows[0];
  };

  const findUserByEmail = async (email) => {
    const client = await connection.connect();
    const res = await client.query("SELECT * FROM users WHERE  email = $1", [
      email,
    ]);

    client.release();
    return res.rows[0];
  };

  const createUser = async (newUser) => {
    const client = await connection.connect();
    let { name, email, password } = newUser;
    password = await bcrypt.hash(password, 10);
    const res = await client.query(
      "INSERT INTO Users (name, email, password, createdat) VALUES ($1, $2, $3,NOW()) RETURNING *",
      [name, email, password]
    );
    client.release();
    return res[0];
  };

  const deleteUserById = async (id) => {
    const client = await connection.connect();
    const res = await client.query("DELETE FROM users WHERE id = $1", [id]);
    client.release();
    return res.rowCount >= 1;
  };

  const editUserById = async (id, value) => {
    const client = await connection.connect();
    const res = await client.query(
      "UPDATE users SET name = $1 , password = $2 WHERE id =  $3 RETURNING * ",
      [value.name, value.password, id]
    );
    client.release();
    return res.rows[0];
  };

  return {
    getUsers,
    createUser,
    getUserById,
    findUserByEmail,
    deleteUserById,
    editUserById,
  };
};
export { UsersModel };
