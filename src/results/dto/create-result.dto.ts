import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateResultDto {

    @IsNotEmpty()
    @IsNumber()
    score: number

    @IsNotEmpty()
    @IsString()
    feedback: string

    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsNumber()
    assignmentId: number

    @IsNotEmpty()
    @IsNumber()
    submittionId: number
}
