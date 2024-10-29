import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('Token topilmadi');
    }

    try {
      const user = await this.jwtService.verifyAsync(token, { secret: 'assalom77777@' });
      if (!await this.userRepo.findOne({ where: { id: user.sub } })) {
        throw new NotFoundException()
      }
      request.user = user;
      return true;
    } catch (error) {
      throw new ForbiddenException(`Token muddati o'tgan yoki xato`);
    }
  }
}
