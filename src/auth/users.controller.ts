import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  // get all users
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: any): Promise<object> {
    const user: User = req.user
    return this.usersService.findAll(user);
  }


  // login
  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {

    try {
      const user = await this.authService.validateUser(email, password);

      if (user) {
        return this.authService.login(user);
      } else {
        return { message: `Login yoki parol noto'g'ri` };
      }
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }

  // get me(user oz profilini kora oladi)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  findOne(@Request() req: any) {
    const id: User = req.user.sub
    return this.usersService.findOne(+id);
  }
}
