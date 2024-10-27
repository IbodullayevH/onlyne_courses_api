import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateModuleDto {

    @IsOptional()
    @IsNotEmpty({ message: `Yangilash uchun maydonlarga qiymatlar kirtish kerak` })
    @IsString()
    module_name?: string
}
