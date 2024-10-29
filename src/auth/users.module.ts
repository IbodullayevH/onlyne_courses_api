import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from '../auth/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/apps/app.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { User } from '../auth/entities/users.entity';
import { UsersService } from './users.service';
import { Result } from 'src/results/entities/result.entity';
import { Submittion } from 'src/submittion/entities/submittion.entity';
import { Course } from 'src/courses/entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Result, Submittion, Course]),
    forwardRef(() => AppModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule { }
