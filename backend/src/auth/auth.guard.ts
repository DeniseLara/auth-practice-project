import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        // Debug: Ver qué cookies llegan
        console.log('Cookies recibidas:', request.cookies);
        console.log('Headers:', request.headers); 

        const token = request.cookies?.access_token;

        if (!token) {
            console.log('NO hay token en cookies');
            throw new UnauthorizedException("No autenticado");
        }

        try {
            // Verifica el token directamente con JwtService
            const payload = this.jwtService.verify(token);
            console.log('Token válido. Payload:', payload);
            
            request.user = {
                userId: payload.userId || payload.sub, // Usa userId o sub
                email: payload.email
            };
            
            return true;
        } catch (error) {
            console.log('Error verificando token:', error.message);
            throw new UnauthorizedException("token inválido");
        }
    }
}