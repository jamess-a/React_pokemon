const db = require('../../Server/db');


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
  