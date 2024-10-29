import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modules } from './entities/module.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { UsersModule } from 'src/auth/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Modules, Course, Lesson, Assignment]),
    AuthModule,
    UsersModule
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule { }
