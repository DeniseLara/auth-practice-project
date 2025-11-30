import { Body, Controller, Get, Post, Req, Res, UseGuards, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { AuthRequest, AuthResponseDto, LoginDto, RegisterDto } from "./dto/auth.dto";
import type { Response } from "express";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(
        @Body() body: RegisterDto,
        @Res({ passthrough: true }) response: Response 
    ): Promise<Omit<AuthResponseDto, "accessToken">> {
        const result = await this.authService.registerUser(body);

        response.cookie("access_token", result.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return {
            user: result.user
        }
    }

    @Post('login')
    async login(
        @Body() body: LoginDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<Omit<AuthResponseDto, "accessToken">> {
        const result = await this.authService.loginUser(body);

        response.cookie("access_token", result.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return {
            user: result.user
        }
    }

    @Post('logout')
    logOut(@Res({ passthrough: true }) response: Response) {
        // limpiar la cookie
        response.clearCookie('access_token', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async getProfile(@Req() req: AuthRequest) {
        const user = req.user?.userId

        if (!user) {
            // Esto solo pasa si el JWT estaba dañado o el Guard falló.
            throw new UnauthorizedException("ID de usuario no disponible");
        }

        const userProfile = await this.authService.getProfile(user);

        return {
            user: userProfile
        }
    }
}