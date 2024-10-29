import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateSubmittionDto } from './dto/create-submittion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Submittion } from './entities/submittion.entity';

@Injectable()
export class SubmittionService {

  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepo: Repository<Assignment>,

    @InjectRepository(Submittion)
    private readonly submittionRepo: Repository<Submittion>
  ) { }


  // Topshiriqni topshirish
  async create(createSubmittionDto: CreateSubmittionDto, user: any): Promise<object> {

    const { assignmentId, answer } = createSubmittionDto;

    const assignment = await this.assignmentRepo.findOne({ where: { id: assignmentId } });
    if (!assignment) {
      throw new NotFoundException(`Topshiriq topilmadi`);
    }

    const submittion = this.submittionRepo.create({
      answer,
      userId: user.sub,
      assignment
    });

    return await this.submittionRepo.save(submittion);
  }
}
