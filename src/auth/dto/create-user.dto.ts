import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UserRole } from "../entities/users.entity";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(8)
    password: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole
}
