import { IsOptional, IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { Level } from '../entities/course.entity';

export class UpdateCourseDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Yangilash uchun maydonlarga qiymatlar kirtish kerak' })
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Yangilash uchun maydonlarga qiymatlar kirtish kerak' })
    description?: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty({ message: 'Yangilash uchun maydonlarga qiymatlar kirtish kerak' })
    price?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Yangilash uchun maydonlarga qiymatlar kirtish kerak' })
    category?: string;

    @IsOptional()
    @IsEnum(Level, { message: "Yangilash uchun maydonlarga qiymatlar kirtish kerak" })
    level?: Level;
}
