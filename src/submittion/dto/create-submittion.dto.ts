import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubmittionDto {
    @IsInt()
    @IsNotEmpty()
    assignmentId: number;

    @IsNotEmpty()
    @IsString()
    answer?: string;
}
