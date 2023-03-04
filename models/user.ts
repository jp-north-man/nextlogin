export interface User {
    id: number;
    email: string;
    password: string;
}

const users:User[] = [
    { id: 1, email: 'user1@example.com', password: '$2b$10$x4l8KvKN3q1fBczeaqbOUuW8tZ.BKjPvxJcvtUpzgW5KtjKpq9CJ2'} // password: test
]

export async function findByEmail(email:string): Promise<User | undefined> {
    return users.find(user => user.email === email)
}