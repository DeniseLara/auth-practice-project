import { IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description: string

    @IsOptional()
    @IsBoolean()
    completed?: boolean = false
}