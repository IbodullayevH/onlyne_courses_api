import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { User } from 'src/auth/entities/users.entity';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto, @Request() req: any) {
    const user: User = req.user
    return this.assignmentsService.create(createAssignmentDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    const user: User = req.user
    return this.assignmentsService.findAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignmentDto: UpdateAssignmentDto, @Request() req: any) {
    const user: User = req.user
    return this.assignmentsService.update(+id, updateAssignmentDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const user: User = req.user
    return this.assignmentsService.remove(+id, user);
  }
}
