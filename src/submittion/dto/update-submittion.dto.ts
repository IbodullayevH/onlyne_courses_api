import { PartialType } from '@nestjs/mapped-types';
import { CreateSubmittionDto } from './create-submittion.dto';

export class UpdateSubmittionDto extends PartialType(CreateSubmittionDto) {}
