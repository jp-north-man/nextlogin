// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { findByEmail } from '../../models/user';
import { createToken } from '../../lib/auth';

const JWT_SECRET = 'secret-key';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST'){
    const {email, password} = req.body;

    const user = await findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = createToken(user)

    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly`);
    
    res.json({ message: 'Login successful' });

  }else{
    res.status(405).json({message:'Method not allowed'})
  }
}

export default handler;