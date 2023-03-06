export interface User {
    id: number;
    email: string;
    password: string;
}

const users:User[] = [
    { id: 1, email: 'user1@example.com', password: '$2a$10$QRsgBRPOxnRKaf.apez4g.62etShtRlvVOwyWczO072uVLGdBi9CW'} // password: password
]

export async function findByEmail(email:string): Promise<User | undefined> {
    return users.find(user => user.email === email)
}