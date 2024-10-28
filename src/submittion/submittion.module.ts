import { Module } from '@nestjs/common';
import { SubmittionService } from './submittion.service';
import { SubmittionController } from './submittion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submittion } from './entities/submittion.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { User } from 'src/auth/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submittion, Assignment, User]),
    AuthModule],
  controllers: [SubmittionController],
  providers: [SubmittionService],
})
export class SubmittionModule { }
