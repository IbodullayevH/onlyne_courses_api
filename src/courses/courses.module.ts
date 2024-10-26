import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, User]),
    AuthModule,
    
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
