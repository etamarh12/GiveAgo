import { db } from "../db.js";
import bcrypt from "bcryptjs";

export const newUser = async (req, res) => {
  // Check req.body received
  console.log("server received : " + JSON.stringify(req.body));

  const { userName, userPassword, userType, userBusinessId } = req.body;

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

  const values = [
    userName ?? null,
    hashedPassword,
    userType ?? null,
    userBusinessId ?? 1,
  ];

  //Sql Query  
  const q = `INSERT INTO accounts (UserName, Password, AccountType, businessId) VALUES (?, ?, ?, ?)`;
  // Send req
  try {
    const [orderRes, _] = await db.promise().execute(q, [...values]);

    const { ...other } = orderRes;

    res.json(other);
  } catch (err) {
    console.log("controller error : " + err)
    return res.status(500).json(err);
  }
};

export const deleteUser = async (req, res) => {

  // Check req.body received
  console.log("server received : " + JSON.stringify(req.body));

  const values = [
    req.body.userName ?? null,
    req.body.userId ?? null,
  ];

  //Sql Query  
  const q = `DELETE FROM accounts WHERE UserName=? and userId=?`;
  // Send req
  try {
    const [orderRes, _] = await db.promise().execute(q, [...values]);

    const { ...other } = orderRes;

    res.json(other);
  } catch (err) {
    console.log("controller eror : " + err)
    return res.status(500).json(err);
  }
};
export const allUsers = async (req, res) => {
  //Sql Query  
  const q = `SELECT userId, UserName, AccountType, businessId FROM accounts`;
  // Send req
  try {
    const rows = await db.promise().execute(q);
    const { ...other } = rows[0];
    res.json(other);
  } catch (err) {
    console.log("controller eror : " + err)
    return res.status(500).json(err);
  }
};

export const stateUsers = async (req, res) => {
  //Sql Query  
  const q = `SELECT UserName, AccountType FROM accounts`;
  // Send req
  try {
    const rows = await db.promise().execute(q);
    const { ...other } = rows[0];
    res.json(other);
  } catch (err) {
    console.log("controller eror : " + err)
    return res.status(500).json(err);
  }
};