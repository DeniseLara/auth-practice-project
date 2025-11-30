import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "src/users/user.service";

@Module({
    imports:[
        JwtModule.register({
            secret: 'clave-secreta',
            signOptions: { expiresIn: '8h' } 
        })
    ],
    providers: [AuthService, UserService],
    controllers: [AuthController],
})
export class AuthModule {}