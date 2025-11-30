import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string

    @IsString()
    @MinLength(4)
    name: string
}

export class LoginDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string
}

export class AuthResponseDto {
    user: {
        id: string
        email: string
        name: string
    }
    accessToken: string
}

export class AuthRequest {
    user?: {
      userId: string;
      email: string;
      name: string;
    };
  }