import { Injectable, NotFoundException, ForbiddenException, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
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

  // create mo00dul0e0
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
        message: `${existLesson?.title} dars ${module.module_name} moduliga qoshildi`,
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

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({ where: { id } });
    if (!lesson) {
      throw new NotFoundException(`Dars #${id} topilmadi`);
    }
    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto, user: User): Promise<Lesson> {
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
    }

    const lesson = await this.findOne(id);
    Object.assign(lesson, updateLessonDto);
    return await this.lessonRepo.save(lesson);
  }

  async remove(id: number, user: User): Promise<{ message: string }> {
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
    }

    const lesson = await this.findOne(id);
    await this.lessonRepo.remove(lesson);
    return { message: `Dars #${id} muvaffaqiyatli o'chirildi` };
  }
}
