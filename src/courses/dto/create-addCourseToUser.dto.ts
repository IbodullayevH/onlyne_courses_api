import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddCourseToUserDto {
    @IsNotEmpty({ message: "courseId maydoni majburiy" })
    @IsNumber()
    courseId: number;
}
