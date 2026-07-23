require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('StudyCircle API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));