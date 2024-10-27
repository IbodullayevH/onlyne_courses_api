import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { User } from 'src/auth/entities/users.entity';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLessonDto: CreateLessonDto, @Request() req: any) {
    const user: User = req.user
    return this.lessonsService.create(createLessonDto, user);
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto, @Request() req: any) {
    const user: User = req.user
    return this.lessonsService.update(+id, updateLessonDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const user: User = req.user
    return this.lessonsService.remove(+id, user);
  }
}
