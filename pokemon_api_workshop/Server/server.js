
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');


app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin_use', adminRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
 