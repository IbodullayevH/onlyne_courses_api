import { BadRequestException, ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/auth/entities/users.entity';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>
  ) { }

  // new course
  async create(createCourseDto: CreateCourseDto, user: User): Promise<object> {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
      }
      const existCourse = await this.courseRepo.findOne({ where: { name: createCourseDto.name } })
      if (existCourse) {
        throw new ConflictException('Bu kurs allaqachon mavjud')
      }

      let newCourse = this.courseRepo.create(createCourseDto)
      const savedCourse = await this.courseRepo.save(newCourse)

      return {
        message: `Yangi kurs muvaffaqiyatli yaratildi`,
        data: savedCourse
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

    }
  }


  // get all courses
  async findAll() {
    try {
      const coursesData = await this.courseRepo.find()

      return {
        message: `Kurslar royxati`,
        data: coursesData
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  // update course
  async update(id: number, updateCourseDto: UpdateCourseDto, user: User) {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
      }

      const hasValidField = Object.values(updateCourseDto).some(value => value !== undefined);
      if (!hasValidField) {
        throw new BadRequestException({
          message: `Yangilash uchun kamida bitta maydon to'ldirilishi kerak`,
        });
      }

      const checkCourse = await this.courseRepo.findOneBy({ id })
      if (!checkCourse) {
        throw new ConflictException('Bu kurs mavjud emas')
      }

      const chekingForDuplicateValue = await this.courseRepo.findOne({ where: { name: updateCourseDto.name } })
      if (chekingForDuplicateValue?.name == updateCourseDto.name) {
        throw new ConflictException(`Siz yangilash uchun kiritayotgan ${updateCourseDto.name} kurs nomi allaqachon boshqa kursda mavjud! Boshqa nom kiriting`)
      }

      await this.courseRepo.update(id, updateCourseDto)
      const updatedCourse = await this.courseRepo.findOneBy({ id })

      return {
        message: `Kurs malumotlari muvaffaqiyatli yangilandi`,
        data: updatedCourse
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  // delete course
  async remove(id: number, user: User) {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
      }

      const checkCourse = await this.courseRepo.findOneBy({ id })
      if (!checkCourse) {
        throw new ConflictException('Bu kurs mavjud emas')
      }

      await this.courseRepo.delete(id)
      return {
        message: `Kurs muvaffaqiyatli o'chirildi`,
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // get courses by categories
  async findCoursesByCategories(category: string) {
    try {

      category = category.toLowerCase()
      const coursesData = await this.courseRepo
        .createQueryBuilder('courses')
        .where(`lower(courses.category) LIKE :category`, { category: `${category}%` })
        .getMany();
  
      if (!coursesData || coursesData.length === 0) {
        throw new NotFoundException(`${category} - kategoriyasidagi kurs mavjud emas`);
      }

      return {
        message: `${coursesData.map(el => el.category)} - kategoriyasidagi kurslar`,
        data: coursesData
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
