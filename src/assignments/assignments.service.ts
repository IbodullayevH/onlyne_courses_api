import { BadRequestException, ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { In, Repository } from 'typeorm';
import { Modules } from 'src/modules/entities/module.entity';
import { User, UserRole } from 'src/auth/entities/users.entity';

@Injectable()
export class AssignmentsService {

  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepo: Repository<Assignment>,

    @InjectRepository(Modules)
    private readonly moduleRepo: Repository<Modules>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>

  ) { }

  // new assignment
  async create(createAssignmentDto: CreateAssignmentDto, user: User): Promise<object> {
    try {

      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
      }

      const module = await this.moduleRepo.findOne({ where: { id: createAssignmentDto.moduleId }, relations: ["assignments"] })
      if (!module) {
        throw new NotFoundException(`#${createAssignmentDto.moduleId} - idlik modul yo'q`)
      }

      if (module.assignments.filter(el => el.description === createAssignmentDto.description).length > 0) {
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

  // user faqat o'zi yozilgan kurs modullarining topshiriqlarini ko'ra oladi
  async findAll(user: any): Promise<object> {
    try {
      const userData = await this.userRepo.findOne({
        where: { id: user.sub },
        relations: ["courses", "courses.modules"]
      });
      
      const moduleIds = userData.courses.flatMap(course => course.modules.map(module => module.id));
      const assignments = await this.assignmentRepo.find({
        where: { moduleId: In(moduleIds) }
      });
      
      if (assignments.length === 0) {
        throw new NotFoundException(`Hozircha siz yozilgan kursning topshiriqlari yo'q!`)
      }

      return {
        message: `Sizni ${userData?.courses[0]?.name} - kursingizni modullaridagi topshiriqlar`,
        assignments: assignments
      }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }



  // update assignment
  async update(id: number, updateAssignmentDto: UpdateAssignmentDto, user: User): Promise<object> {
    try {

      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
      }

      const hasValidField = Object.values(updateAssignmentDto).some(value => value !== undefined);
      if (!hasValidField) {
        throw new BadRequestException({
          message: `Yangilash uchun kamida bitta maydon to'ldirilishi kerak`,
        });
      }

      const assignment = await this.assignmentRepo.findOne({ where: { id }, relations: ["module"] });
      if (!assignment) {
        throw new NotFoundException(`#${id} - idlik assignment topilmadi`);
      }

      const chekingForDuplicateValue = await this.assignmentRepo.findOne({ where: { description: updateAssignmentDto.description } })

      if (chekingForDuplicateValue?.description == updateAssignmentDto.description) {
        throw new ConflictException(`Siz yangilash uchun kiritayotgan description allaqachon boshqa assignment descriptionida mavjud! Boshqa nom kiriting`)
      }

      await this.assignmentRepo.update(id, updateAssignmentDto)
      const updatedAssignment = await this.assignmentRepo.findOneBy({ id })

      return {
        message: `Assignment #${id} yangilandi`,
        data: updatedAssignment
      };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // remove assignment
  async remove(id: number, user: User): Promise<object> {
    try {

      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
      }

      const assignment = await this.assignmentRepo.findOne({ where: { id } });
      if (!assignment) {
        throw new NotFoundException(`#${id} - idlik assignment topilmadi`);
      }

      await this.assignmentRepo.remove(assignment);

      return {
        message: `Assignment #${id} o'chirildi`
      };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
