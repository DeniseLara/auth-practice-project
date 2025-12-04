import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(body: { email: string, password: string, name: string }): Promise<User> {
        // Verificar si el usuario ya existe
        const existingUser = await this.userRepository.findOne({ 
            where: { email: body.email } 
        });
        
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(body.password, 10)

        const user: User = await this.userRepository.create({
                id: uuidv4(),
                email: body.email,
                password: hashedPassword,
                name: body.name,
        })
        return this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email }})
    }

    async findOne(id: string) {
        return this.userRepository.findOne({ where: { id }});
    }
}