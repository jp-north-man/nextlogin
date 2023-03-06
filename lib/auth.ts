import jwt from 'jsonwebtoken';
import { User } from "../models/user";

const JWT_SECRET = 'secret-key';    

export function createToken(user: User): string {
    return jwt.sign({email: user.email}, JWT_SECRET)
}

