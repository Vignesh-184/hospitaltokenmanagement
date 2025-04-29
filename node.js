const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

const users = [
  // Example users stored in-memory
  { email: "john@example.com", phone: "9876543210", appointments: [] }
];

app.post('/api/submit-appointment', (req, res) => {
  const { email, phone } = req.body;

  const existingUser = users.find(user => user.email === email || user.phone === phone);

  if (existingUser) {
    // Existing user logic
    return res.json({ existing: true });
  }

  // New user logic: Generate a token and assign a queue position
  const token = 'SUN' + Math.floor(Math.random() * 90000 + 10000);
  const queuePosition = Math.floor(Math.random() * 20) + 1;
  
  // Save user info to database here (for now it's in-memory)
  users.push(req.body);

  // Respond with token and queue position
  res.json({ existing: false, token, queuePosition });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
