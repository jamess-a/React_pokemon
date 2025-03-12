const db = require("../../Server/db");
const bcrypt = require("bcryptjs");

exports.getUserDetails = (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    console.log("Query result:", result);
    res.json(result);
  });
};

exports.get_admin_user = (req, res) => {
  const sql = "SELECT * FROM admins";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    console.log("Query result:", result);
    res.json(result);
  });
};

exports.deleteAdminUser = (req, res) => {
  const ids = req.params.ids.split(",");
  if (!Array.isArray(ids)) {
    return res
      .status(400)
      .json({ message: "Invalid input. Expected an array of ids." });
  }
  const placeholders = ids.map(() => "?").join(",");
  const sql = `DELETE FROM users WHERE id IN (${placeholders})`;
  db.query(sql, ids, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    console.log("Query result:", result);
    res.json({ message: `${result.affectedRows} records deleted.` });
  });
};
exports.deleteUser = (req, res) => {
  const ids = req.params.ids.split(",");
  if (!Array.isArray(ids)) {
    return res
      .status(400)
      .json({ message: "Invalid input. Expected an array of ids." });
  }
  const placeholders = ids.map(() => "?").join(",");
  const sql = `DELETE FROM users WHERE id IN (${placeholders})`;
  db.query(sql, ids, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    console.log("Query result:", result);
    res.json({ message: `${result.affectedRows} records deleted.` });
  });
};

exports.addUser = (req, res) => {
  const { username, password, email, age, phone, height } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res
        .status(500)
        .json({ message: "Error hashing password", error: err });
    }
    const sql =
      "INSERT INTO users (username, password, email, age, phone, height) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [username, hashedPassword, email, age, phone, height],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }
        console.log("Query result:", result);
        res.json({ message: "User added successfully", result });
      }
    );
  });
};

exports.addAdmin = (req, res) => {
  const { username, password, email, age, phone, height } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res
        .status(500)
        .json({ message: "Error hashing password", error: err });
    }
    const sql =
      "INSERT INTO admins (username, password, email, age, phone, height) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [username, hashedPassword, email, age, phone, height],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }
        console.log("Query result:", result);
        res.json({ message: "User added successfully", result });
      }
    );
  });
};
