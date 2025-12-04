import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthResponseDto, LoginDto, RegisterDto } from "./dto/auth.dto";
import { UserService } from "src/users/user.service";
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}
    
    async registerUser(body: RegisterDto): Promise<AuthResponseDto> {
        const exitingUser = await this.userService.findByEmail(body.email);
        if (exitingUser) {
            throw new ConflictException("El usuario ya existe");
        }
        
        // resgitramos a usuario
        const user = await this.userService.createUser({
            email: body.email,
            password: body.password,
            name: body.name
        });

        // generamos el token
        const accessToken = this.jwtService.sign({
            userId: user.id,
            email: user.email
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            accessToken
        }
    }

    async loginUser(body: LoginDto) {
        // buscar usuario registrado
        const user = await this.userService.findByEmail(body.email)
        if (!user) {
            throw new UnauthorizedException("email inválido");
        }

        //verificar contraseña
        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("contraseña inválida")
        }

        const accessToken = this.jwtService.sign({
                userId: user.id,
                email: user.email
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            accessToken
        }
    }

    async getProfile(userId: string) {
        const user = await this.userService.findOne(userId); 

        if (!user) {
            throw new UnauthorizedException("Usuario no encontrado");
        }

        // Devolvemos el objeto limpio
        return {
            id: user.id,
            email: user.email,
            name: user.name
        };
    }

    verifyToken(token: string) {
        try {
            return this.jwtService.verify(token)
        } catch {
            throw new UnauthorizedException("token inválido");
        }
    }
}