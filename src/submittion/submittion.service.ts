import { Injectable } from '@nestjs/common';
import { CreateSubmittionDto } from './dto/create-submittion.dto';
import { UpdateSubmittionDto } from './dto/update-submittion.dto';

@Injectable()
export class SubmittionService {
  create(createSubmittionDto: CreateSubmittionDto) {
    return 'This action adds a new submittion';
  }

  findAll() {
    return `This action returns all submittion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} submittion`;
  }

  update(id: number, updateSubmittionDto: UpdateSubmittionDto) {
    return `This action updates a #${id} submittion`;
  }

  remove(id: number) {
    return `This action removes a #${id} submittion`;
  }
}
