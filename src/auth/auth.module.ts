import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/auth/users.controller';
import { UsersService } from 'src/auth/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/auth/entities/users.entity';
import { UsersModule } from './users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'assalom77777@',
      signOptions: { expiresIn: '180s' },
    }),
    forwardRef(() => UsersModule)
  ],
  controllers: [UsersController, AuthController],
  providers: [
    UsersService,
    AuthService,
  ],
  exports: [JwtModule]
})
export class AuthModule { }

