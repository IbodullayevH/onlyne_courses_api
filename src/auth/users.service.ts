import { BadRequestException, ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { User, UserRole } from './entities/users.entity';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }


  // new user
  async create(createUserDto: CreateUserDto): Promise<object> {
    try {
      let existUser = await this.userRepo.findOne({ where: { email: createUserDto.email } });
      if (existUser) {
        throw new ConflictException("User ushbu email bilan allaqachon royxatdan o'tgan");
      }

      const hashedPassword = await bcrypt.hash(`${createUserDto.password}`, 10)
      createUserDto.password = hashedPassword;

      // cheking role
      let checkRole = await this.userRepo.find({ where: { role: createUserDto.role } });

      if (createUserDto.role === 'admin' && checkRole.length >= 1) {
        throw new ForbiddenException('Sayitda faqat bitta admin boladi');
      }

      let newUser = this.userRepo.create(createUserDto)
      const user = await this.userRepo.save(newUser);
      const { password, ...result } = user

      return {
        message: 'Successfully created new user',
        data: result,
      };
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  // get all users data
  async findAll(user: User): Promise<object> {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException("Foydalanuvchida ushbu amallarni bajarish huquqi yo'q");
      }
      const usersData = await this.userRepo.find({
        relations:['courses']
      }
      )

      return {
        message: 'Users data',
        data: usersData.map(({ password, ...rest }) => rest)
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

  }


  // get me(user oz profilini kora oladi)
  public async findOne(id: number): Promise<object> {
    try {

      const userData = await this.userRepo.findOne({
        relations:['courses'],
        where: { id: id }
      })
      if (!userData) {
        throw new NotFoundException(`${id}-idga ega user mavjud emas`)
      }
      const { password, ...result } = userData
      return {
        message: `${id}-idga ega user`,
        data: result
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }



  // find by email
  async findByemail(email: string): Promise<User | null> {
    try {
      const findUserByEmail = await this.userRepo.findOneBy({ email })
      if (!findUserByEmail) {
        throw new NotFoundException(`Email "${email}" bilan user topilmadi`);
      }

      return findUserByEmail
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

    }
  }
}
