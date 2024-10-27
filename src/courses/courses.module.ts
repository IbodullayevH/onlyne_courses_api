import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/users.entity';
import { Modules } from 'src/modules/entities/module.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, User, Modules]),
    AuthModule
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
