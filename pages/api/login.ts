// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret-key';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST'){
    const {email, password} = req.body;
    //validationの実装
    
    const token = jwt.sign({email}, JWT_SECRET);
    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly`);
    res.json({ message: 'Login successful' });
  }else{
    res.status(405).json({message:'Method not allowed'})
  }
}

export default handler;