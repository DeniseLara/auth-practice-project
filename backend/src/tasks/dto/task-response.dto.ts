import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class UpdateHabitDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string
}