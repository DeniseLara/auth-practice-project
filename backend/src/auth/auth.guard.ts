import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies?.access_token;

        if (!token) {
            throw new UnauthorizedException("No autenticado");
        }

        try {
            const user = await this.authService.verifyToken(token);
            request.user = user
            return true
        } catch {
            throw new UnauthorizedException("token inválido");
        }
    }
}