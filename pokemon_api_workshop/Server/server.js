
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
