import { Injectable, NotFoundException, ForbiddenException, ConflictException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { User, UserRole } from 'src/auth/entities/users.entity';
import { Modules } from 'src/modules/entities/module.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,

    @InjectRepository(Modules)
    private readonly moduleRepo: Repository<Modules>
  ) { }

  // create module
  async create(createLessonDto: CreateLessonDto, user: User): Promise<object> {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
      }

      const module = await this.moduleRepo.findOne({ where: { id: createLessonDto.moduleId } })
      if (!module) {
        throw new NotFoundException(`Modul mavjud emas`)
      }

      const existLesson = await this.lessonRepo.findOne({ where: { title: createLessonDto.title } })
      if (existLesson) {
        throw new ConflictException(
          `${module.module_name} moduliga '${existLesson?.title}' darsi avval qoshilgan`)
      }

      const lesson = this.lessonRepo.create(createLessonDto);
      return {
        message: `'${lesson.title}' - darsi '${module.module_name}' moduliga qoshildi`,
        data: await this.lessonRepo.save(lesson)
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Lesson[]> {
    return await this.lessonRepo.find();
  }


  // update lesson
  async update(id: number, updateLessonDto: UpdateLessonDto, user: User): Promise<object> {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
      }

      const hasValidField = Object.values(updateLessonDto).some(value => value !== undefined);
      if (!hasValidField) {
        throw new BadRequestException({
          message: `Yangilash uchun kamida bitta maydon to'ldirilishi kerak`,
        });
      }

      const lesson = await this.lessonRepo.findOneBy({ id })
      if (!lesson) {
        throw new ConflictException('Bu Lessson mavjud emas')
      }

      const chekingForDuplicateValue = await this.lessonRepo.findOne({ where: { title: updateLessonDto.title } })

      if (chekingForDuplicateValue?.title == updateLessonDto.title) {
        throw new ConflictException(`Siz yangilash uchun kiritayotgan '${updateLessonDto.title}' lessson nomi allaqachon boshqa lesssonda mavjud! Boshqa nom kiriting`)
      }

      await this.lessonRepo.update(id, updateLessonDto)
      const updatedlesson = await this.lessonRepo.findOneBy({ id })

      return {
        message: `Lessson malumotlari muvaffaqiyatli yangilandi`,
        data: updatedlesson
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  // delete lesson
  async remove(id: number, user: User): Promise<{ message: string }> {
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
    }

    const lesson = await this.lessonRepo.findOneBy({ id })
    await this.lessonRepo.remove(lesson);
    return { message: `Dars #${id} muvaffaqiyatli o'chirildi` };
  }
}
