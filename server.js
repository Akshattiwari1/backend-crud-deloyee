require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usersRoute = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Users API
app.use('/api/users', usersRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
