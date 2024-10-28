import { Module } from '@nestjs/common';
import { SubmittionService } from './submittion.service';
import { SubmittionController } from './submittion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submittion } from './entities/submittion.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Result } from 'src/results/entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submittion, Assignment, Result]),
    AuthModule],
  controllers: [SubmittionController],
  providers: [SubmittionService],
})
export class SubmittionModule { }
