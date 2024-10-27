import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateModuleDto {

    @IsNotEmpty({ message: `Maydon bo'sh bo'lishi mumkin emas` })
    @IsString()
    module_name: string

    @IsNotEmpty({ message: `Maydon bo'sh bo'lishi mumkin emas` })
    @IsNumber()
    courseId: number
}


