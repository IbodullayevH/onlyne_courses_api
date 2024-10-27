import { IsNotEmpty, IsString, IsEnum, IsOptional, IsInt, IsUrl } from 'class-validator';
import { LessonType } from '../entities/lesson.entity';

export class CreateLessonDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsNotEmpty()
    @IsEnum(LessonType)
    type: LessonType;

    @IsOptional()
    @IsUrl()
    videoUrl?: string;

    @IsNotEmpty()
    @IsInt()
    moduleId: number;
}
