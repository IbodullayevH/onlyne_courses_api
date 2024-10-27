import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/users.entity';
import { UsersModule } from 'src/auth/users.module';
import { Course } from 'src/courses/entities/course.entity';
import { CoursesModule } from 'src/courses/courses.module';
import { ModulesModule } from 'src/modules/modules.module';
import { Modules } from 'src/modules/entities/module.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { LessonsModule } from 'src/lessons/lessons.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get("DB_URL"),
        entities: [User, Course, Modules, Lesson],
        synchronize: true,
        // logging: true
      }),

      inject: [ConfigService]
    }),
    UsersModule,
    CoursesModule,
    ModulesModule,
    LessonsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
