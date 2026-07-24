require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const noteRoutes = require('./routes/noteRoutes');
const doubtRoutes = require('./routes/doubtRoutes');
const answerRoutes = require('./routes/answerRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('StudyCircle API is running');
});

app.use('/api/notes', noteRoutes);
app.use('/api/doubts', doubtRoutes);
app.use('/api/answers', answerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));