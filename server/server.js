require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const noteRoutes = require('./routes/noteRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('StudyCircle API is running');
});

app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));