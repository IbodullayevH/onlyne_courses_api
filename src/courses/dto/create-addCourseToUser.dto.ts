import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddCourseToUserDto {
    @IsNotEmpty({ message: "userId maydoni majburiy" })
    @IsNumber()
    userId: number;

    @IsNotEmpty({ message: "courseId maydoni majburiy" })
    @IsNumber()
    courseId: number;
}
