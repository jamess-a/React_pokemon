const db = require("../../Server/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  console.log(req.body);
  const { username, password, email, ages, phone, height } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;
    const sql =
      "INSERT INTO users (username, password, email , age , phone , height) VALUES (?, ?, ? , ? , ? , ?)";
    db.query(
      sql,
      [username, hashedPassword, email, ages, phone, height],
      (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send("User registered");
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  try {
    db.query(sql, [email], (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0) return res.status(400).send("User not found");
      const user = result[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) return res.status(400).send("Incorrect password");
        const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
          expiresIn: "1h",
        });
        res.json({ token });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.Admin_login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM admins WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(400).send("User not found");

    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) return res.status(400).send("Incorrect password");
      const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
        expiresIn: "1h",
      });
      res.json({ token });
    });
  });
};
