import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Modules } from 'src/modules/entities/module.entity';
import { Result } from 'src/results/entities/result.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/users.entity';

@Module({

  imports: [TypeOrmModule.forFeature([Assignment, Modules, Result, User]),
    AuthModule
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
})
export class AssignmentsModule { }
