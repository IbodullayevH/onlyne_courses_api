import { forwardRef, Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Modules } from 'src/modules/entities/module.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/auth/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Modules]),
    AuthModule,
  forwardRef(() => UsersModule)
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule { }
