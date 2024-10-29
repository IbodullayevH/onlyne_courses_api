import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { User } from 'src/auth/entities/users.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateAddCourseToUserDto } from './dto/create-addCourseToUser.dto';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @Request() req: any) {
    const user: User = req.user
    return this.coursesService.create(createCourseDto, user);
  }
  
  
  @UseGuards(JwtAuthGuard)
  @Post('add-user')
  addCourseToUser(@Body() createAddCourseToUserDto: CreateAddCourseToUserDto,  @Request() req: any) {
    const user: User = req.user    
    return this.coursesService.addCourseToUser(createAddCourseToUserDto, user)
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('category/:category')
  findCoursesByCategories(@Param('category') category: string) {
    return this.coursesService.findCoursesByCategories(category);
  }

  @Get(':courseId/modules')
  ViewAllModulesInTheCourse(@Param('courseId') courseId: number) {
    return this.coursesService.ViewAllModulesInTheCourse(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @Request() req: any) {
    const user: User = req.user
    return this.coursesService.update(+id, updateCourseDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const user: User = req.user
    return this.coursesService.remove(+id, user);
  }
}
