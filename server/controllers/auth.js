import { db } from "../db.js";
import bcrypt from "bcryptjs";
import moment from "moment";

// login
export const login = async (req, res) => {
  console.log("server received: " + JSON.stringify(req.body)); // Checking server receive.

  const { UserName: userName, Password: password } = req.body;
  const q = `SELECT * FROM accounts WHERE UserName = ?`;

  try {
    // Receiving info from db
    const [userRes, _] = await db.promise().execute(q, [userName]);

    if (userRes.length === 0) {
      // Check user length
      return res.status(404).json({ error: "Username or password is incorrect" });
    }
    const { IsLocked, LockoutExpiresAt } = userRes[0];
    // Check if the account is locked
    if (IsLocked) {
      const currentTime = new Date();
      const lockoutExpiresAt = new Date(LockoutExpiresAt);

      // Check if the lockout period has expired
      if (currentTime <= lockoutExpiresAt) {
        return res.status(403).json({ error: "Account locked. Please try again later" });
      } else {
        // Remove the lock
        await db.promise().execute('UPDATE accounts SET IsLocked = 0, LockoutExpiresAt = NULL WHERE UserName = ?', [userName]);
      }
    }

    const isPasswordCorrect = bcrypt.compareSync(password, userRes[0].Password);

    if (!isPasswordCorrect) {
      // Check password
      // Increment failed login attempts in the database
      await db.promise().execute('UPDATE accounts SET FailedLoginAttempts = FailedLoginAttempts + 1 WHERE UserName = ?', [userName]);

      // Check if the maximum attempts have been reached
      const [failedAttemptsRes, __] = await db.promise().execute('SELECT FailedLoginAttempts FROM accounts WHERE UserName = ?', [userName]);

      const failedAttempts = failedAttemptsRes[0].FailedLoginAttempts;

      if (failedAttempts >= 3) {
        // Lock the account by setting IsLocked and LockoutExpiresAt fields
        const lockoutExpiresAt = moment().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');

        await db.promise().execute('UPDATE accounts SET IsLocked = 1, LockoutExpiresAt = ? WHERE UserName = ?', [lockoutExpiresAt, userName]);

        return res.status(403).json({ error: "Account locked. Please try again later" });
      }
      return res.status(400).json({ error: "Username or password is incorrect" });
    }

    // Reset failed login attempts
    await db.promise().execute('UPDATE accounts SET FailedLoginAttempts = 0 WHERE UserName = ?', [userName]);

    const { Password, ...other } = userRes[0];

    res.json({ ...other, accountType: other.AccountType }); // Respond success
  } catch (err) {
    console.log("controller error: ", err);
    return res.status(500).json({ error: "Connection error" }); // Respond error
  }
};