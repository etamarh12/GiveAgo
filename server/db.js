import mysql from "mysql2";

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: "giveago"
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});