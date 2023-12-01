import { db } from "../db.js";
import bcrypt from "bcryptjs";
import moment from "moment";

// login
export const login = async (req, res) => {
  console.log("server received: " + JSON.stringify(req.body));

  const { UserName: userName, Password: password } = req.body;
  const q = `SELECT * FROM accounts WHERE UserName = ?`;

  try {
    const [userRes, _] = await db.promise().execute(q, [userName]);

    if (userRes.length === 0) {
      return res.status(404).json({ error: "Username or password is incorrect" });
    }
    const { IsLocked, LockoutExpiresAt } = userRes[0];
    
    if (IsLocked) {
      const currentTime = new Date();
      const lockoutExpiresAt = new Date(LockoutExpiresAt);

      if (currentTime <= lockoutExpiresAt) {
        return res.status(403).json({ error: "Account locked. Please try again later" });
      } else {
        await db.promise().execute('UPDATE accounts SET IsLocked = 0, LockoutExpiresAt = NULL WHERE UserName = ?', [userName]);
      }
    }

    const isPasswordCorrect = bcrypt.compareSync(password, userRes[0].Password);

    if (!isPasswordCorrect) {
      await db.promise().execute('UPDATE accounts SET FailedLoginAttempts = FailedLoginAttempts + 1 WHERE UserName = ?', [userName]);

      const [failedAttemptsRes, __] = await db.promise().execute('SELECT FailedLoginAttempts FROM accounts WHERE UserName = ?', [userName]);

      const failedAttempts = failedAttemptsRes[0].FailedLoginAttempts;

      if (failedAttempts >= 3) {
        const lockoutExpiresAt = moment().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');

        await db.promise().execute('UPDATE accounts SET IsLocked = 1, LockoutExpiresAt = ? WHERE UserName = ?', [lockoutExpiresAt, userName]);

        return res.status(403).json({ error: "Account locked. Please try again later" });
      }
      return res.status(400).json({ error: "Username or password is incorrect" });
    }

    await db.promise().execute('UPDATE accounts SET FailedLoginAttempts = 0 WHERE UserName = ?', [userName]);

    const { Password, ...other } = userRes[0];

    res.json({ ...other, accountType: other.AccountType }); // Respond success
  } catch (err) {
    console.log("controller error: ", err);
    return res.status(500).json({ error: "Connection error" }); // Respond error
  }
};