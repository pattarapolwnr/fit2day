const cors = require('cors');
const express = require('express');
// const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const bcrypt = require('bcrypt');
const authRoutes = require('./src/routes/auth');
const mongoose = require('mongoose');
const { config } = require('./config/config');

const app = express();

// Connect to MongoDB Atlas
mongoose
  .connect(config.mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Use authentication routes
app.use('/auth', authRoutes);

const port = 8000;

app.get('/hello-world', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
