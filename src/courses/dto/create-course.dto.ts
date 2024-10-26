import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Level } from '../entities/course.entity';

export class CreateCourseDto {
    @IsNotEmpty({message: "Kursning nomi bolishi kerak"})
    @IsString()
    name: string;

    @IsNotEmpty({message: "Kursning descriptioni bolishi kerak"})
    @IsString()
    description: string;

    @IsNotEmpty({message: "Kursning narxi bolishi kerak"})
    @IsNumber()
    price: number;

    @IsNotEmpty({message: "Kursning turkumi bolishi kerak"})
    @IsString()
    category: string;

    @IsNotEmpty({message: "Kursning darajasi bolishi kerak"})
    @IsEnum(Level, { message: "Darajasi quyidagilardan biri bo'lishi kerak: beginner, intermediate, advanced, expert" })
    level: Level;
}
