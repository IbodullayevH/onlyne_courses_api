import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/auth/entities/users.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Submittion } from 'src/submittion/entities/submittion.entity';

@Injectable()
export class ResultsService {

  constructor(
    @InjectRepository(Result)
    private readonly resultRepo: Repository<Result>,

    @InjectRepository(Assignment)
    private readonly assignmentRepo: Repository<Assignment>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Submittion)
    private readonly submittionRepo: Repository<Submittion>
  ) { }

  // javob qaytarish
  async create(createResultDto: CreateResultDto, user: any): Promise<object> {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
      }


      if (!await this.userRepo.findOne({ where: { id: createResultDto.userId } })) {
        throw new NotFoundException(`User #id - ${createResultDto.userId} nout found`)
      }

      if (!await this.assignmentRepo.findOne({ where: { id: createResultDto.assignmentId } })) {
        throw new NotFoundException(`Assignment #id - ${createResultDto.assignmentId} nout found`)
      }

      if (!await this.submittionRepo.findOne({ where: { id: createResultDto.submittionId } })) {
        throw new NotFoundException(`Submittion #id - ${createResultDto.submittionId} nout found`)
      }
      const result = this.resultRepo.create(createResultDto)
      const saveResult = await this.resultRepo.save(result)
      return { saveResult }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(user: any): Promise<object> {
    try {

      const result = await this.resultRepo.findOne({ where: { userId: user.sub }, relations:["user", "submittion"] })
      if (!result) {
        throw new NotFoundException(`Sizni topshirig'ingiz hali baholanmadi!`)
      }
      return {
        message: `Siznig topshirig'ingiz baholandi`,
        data: result
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} result`;
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
