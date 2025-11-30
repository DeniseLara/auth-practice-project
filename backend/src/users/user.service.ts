import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "./user.type";
import bcrypt from 'bcrypt';
import { randomUUID } from "crypto";

@Injectable()
export class UserService {
    private users: User[] = [];

    async createUser(body: { email: string, password: string, name: string }): Promise<User> {
        const existingUser = this.users.find(u => u.email === body.email) 
        if (existingUser) {
            throw new ConflictException("Usuario ya existe");
        }

        const hashedPassword = await bcrypt.hash(body.password, 10)

        const user: User = {
            id: randomUUID(),
            email: body.email,
            password: hashedPassword,
            name: body.name
        }
        this.users.push(user)
        return user
    }

    findByEmail(email: string): User | undefined {
        return this.users.find(u => u.email === email)
    }

    findOne(id: string) {
        return this.users.find(u => u.id === id)
    }
}