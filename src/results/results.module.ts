import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Submittion } from 'src/submittion/entities/submittion.entity';
import { User } from 'src/auth/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result, Assignment, Submittion, User]),
    AuthModule,
  ],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule { }
