import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from '../auth/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/apps/app.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { User } from '../auth/entities/users.entity';
import { UsersService } from './users.service';
import { Result } from 'src/results/entities/result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Result]),
    forwardRef(() => AppModule),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService]
})
export class UsersModule { }
