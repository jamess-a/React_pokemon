const db = require("../../Server/db");

exports.getUserDetailsadmin = (req, res) => {
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
