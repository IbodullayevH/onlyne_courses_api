import { ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { Modules } from 'src/modules/entities/module.entity';
import { User, UserRole } from 'src/auth/entities/users.entity';

@Injectable()
export class AssignmentsService {

  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepo: Repository<Assignment>,

    @InjectRepository(Modules)
    private readonly moduleRepo: Repository<Modules>

  ) { }

  // new assignment
  async create(createAssignmentDto: CreateAssignmentDto, user: User): Promise<object> {
    try {

      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
      }

      const module = await this.moduleRepo.findOne({ where: { id: createAssignmentDto.moduleId } })
      if (!module) {
        throw new NotFoundException(`${createAssignmentDto.moduleId} - idlik modul yo'q`)
      }

      if (module.assignments.description === createAssignmentDto.description) {
        throw new ConflictException(`Siz ushbu assignmentni avval ${module.module_name} - moduliga qoshgansiz.`)
      }

      let assignment = this.assignmentRepo.create(createAssignmentDto)
      const newAssignment = await this.assignmentRepo.save(assignment)
      
      return {
        message: 'New assignment created',
        data: newAssignment
      }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  findAll() {
    return `This action returns all assignments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assignment`;
  }

  update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    return `This action updates a #${id} assignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignment`;
  }
}
