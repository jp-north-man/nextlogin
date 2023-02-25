import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = 'secret-key';

interface User {
  email: string;
  password: string;
}

const users: User[] = [
  {
    email: 'example@gmail.com',
    password: '$2b$10$NI3yq06JHb7pbDhRtZnBGeZvBXLu47hVlE8B.nfiUN7q3dysEr/j2' // hashed password
  },
  {
    email: 'example@yahoo.co.jp',
    password: '$2b$10$w5NhE1YYC5F5XpjO5Q2xSeZ0bFwrPYhD8CbmzUPaqwPTkE.KzYwhS' // hashed password
  }
];

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by username
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  // Generate token
  const token = jwt.sign({ email }, JWT_SECRET);

  // Set token in cookie
  res.cookie('token', token, { httpOnly: true });

  res.json({ message: 'Login successful' });
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
