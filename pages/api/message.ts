import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret-key';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const user = jwt.verify(token, JWT_SECRET) as {email: string};  
      console.log(user.email)
      res.json({ email: user.email });
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
