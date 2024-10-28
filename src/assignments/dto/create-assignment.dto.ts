import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateAssignmentDto {

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsInt()
    moduleId: number;
}
