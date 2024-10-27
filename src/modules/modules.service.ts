import { BadRequestException, ConflictException, ForbiddenException, Get, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { User, UserRole } from 'src/auth/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Modules } from './entities/module.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Injectable()
export class ModulesService {

  constructor(
    @InjectRepository(Modules)
    private readonly moduleRepo: Repository<Modules>,

    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>
  ) { }

  // new module
  async create(createModuleDto: CreateModuleDto, user: User): Promise<object> {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
      }
      const existModule = await this.moduleRepo.findOne({ where: { module_name: createModuleDto.module_name } })
      if (existModule) {
        throw new ConflictException('Bu module allaqachon mavjud')
      }

      const course = await this.courseRepo.findOne({
        where: {
          id: createModuleDto.courseId
        }
      })
      if (!course) {
        throw new NotFoundException(`${createModuleDto.courseId} - idlik course yoq`)
      }

      let newModule = this.moduleRepo.create(createModuleDto)
      const savedModule = await this.moduleRepo.save(newModule)

      return {
        message: `Yangi module muvaffaqiyatli yaratildi`,
        data: savedModule
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findModulesLessons(moduleId:number): Promise<object> {
    try {
      const moduleData = await this.moduleRepo.findOne({
        where:{id: moduleId},
        relations:['lessons']
      });

      return {
        message: "Success",
        data: moduleData && moduleData.lessons.length > 0 ? moduleData.lessons : [],
      } 
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // update
  async update(id: number, updateModuleDto: UpdateModuleDto, user: User): Promise<object> {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
      }

      const hasValidField = Object.values(updateModuleDto).some(value => value !== undefined);
      if (!hasValidField) {
        throw new BadRequestException({
          message: `Yangilash uchun kamida bitta maydon to'ldirilishi kerak`,
        });
      }

      const module = await this.moduleRepo.findOneBy({ id })
      if (!module) {
        throw new ConflictException('Bu modul mavjud emas')
      }

      const chekingForDuplicateValue = await this.moduleRepo.findOne({ where: { module_name: updateModuleDto.module_name } })

      if (chekingForDuplicateValue?.module_name == updateModuleDto.module_name) {
        throw new ConflictException(`Siz yangilash uchun kiritayotgan ${updateModuleDto.module_name} modul nomi allaqachon boshqa modulda mavjud! Boshqa nom kiriting`)
      }

      await this.moduleRepo.update(id, updateModuleDto)
      const updatedModule = await this.moduleRepo.findOneBy({ id })

      return {
        message: `Modul malumotlari muvaffaqiyatli yangilandi`,
        data: updatedModule
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  // remove
  async remove(id: number, user: User): Promise<object> {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
      }

      const module = await this.moduleRepo.findOneBy({ id })
      if (!module) {
        throw new ConflictException('Bu modul mavjud emas')
      }

      await this.moduleRepo.delete(id)
      return {
        message: `Modul muvaffaqiyatli o'chirildi`
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
