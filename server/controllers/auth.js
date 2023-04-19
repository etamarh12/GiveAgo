import { db } from "../db.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  console.log("server received : " + JSON.stringify(req.body));
  const { UserName: userName, Password: password } = req.body;
  //CHECK USER
  const q = `SELECT * FROM accounts WHERE UserName = ?`;
  try {
    const [userRes, _] = await db.promise().execute(q, [userName]);
    console.log("this is userres : " + userRes[0]);
    if (userRes.length === 0) {
      console.log("problem ?1")
      return res.status(404).json("Username or password is incorrect");
    } else {
      console.log("else is goood and passing level 2")
    };

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      userRes[0].Password
    );

    if (!isPasswordCorrect) {
      console.log("wrong password")
      return res.status(400).json("Username or password is incorrect");
    } else {
      console.log("else is goood and passing level 3")
    };

    const { Password, ...other } = userRes[0];
    res.json({ ...other, accountType: other.AccountType });
  } catch (err) {
    console.log("controller eror : " + err)
    return res.status(500).json(err);
  }
};