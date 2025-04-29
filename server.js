const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

const User = require('./models/User');

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospital', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Route to handle appointment submission
app.post('/api/submit-appointment', async (req, res) => {
  const { email, phone } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      // Existing user
      return res.json({ existing: true });
    }

    // New user
    const token = 'SUN' + Math.floor(Math.random() * 90000 + 10000);
    const queuePosition = Math.floor(Math.random() * 20) + 1;

    const newUser = new User({
      ...req.body,
      token,
      queuePosition
    });

    await newUser.save();

    res.json({ existing: false, token, queuePosition });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
