const db = require("../../Server/db");
const jwt = require("jsonwebtoken");

exports.getUserDetails = (req, res) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied: No token provided" });
  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err)
      return res
        .status(400)
        .json({ message: "Invalid token or expired token" });
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [decoded.id], (err, result) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });
      if (result.length === 0)
        return res.status(404).json({ message: "User not found" });
      res.json(result[0]);
    });
  });
};

exports.getAdminDetails = (req, res) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied: No token provided" });
  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err)
      return res
        .status(400)
        .json({ message: "Invalid token or expired token" });
    const sql = "SELECT * FROM admins WHERE id = ?";
    db.query(sql, [decoded.id], (err, result) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });
      if (result.length === 0)
        return res.status(404).json({ message: "User not found" });
      res.json(result[0]);
    });
  });
};



exports.postuseredits = async (req, res) => {
  const sql = "UPDATE users SET username = ? WHERE id = ?";
  db.query(sql, [req.body.newuser, req.params.id], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Database error", error: err });
    res.json({ message: "User updated successfully", result });
  });
};
