import { UsersService } from 'src/auth/users.service';
import { Controller, Post, Body, UnauthorizedException, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) { }

    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string, @Res() res: Response) {
        const user = await this.authService.validateUser(email, password)

        if (!user) {
            throw new UnauthorizedException(`Login yoki parol noto'g'ri`)
        }
        const token = await this.authService.login(user);        
        res.cookie('jwt_token', token, { httpOnly: true, secure: true })
        res.status(200).send(token)
    }

    // registeration
    @Post('register')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    // Logout
    @Post('logout')
    logout(@Res() res: Response) {
        res.clearCookie('jwt_token'); // JWT cookie-ni o'chirib tashlash
        throw new HttpException('Tizimdan muvaffaqiyatli chiqildi', HttpStatus.OK)
    }
}
