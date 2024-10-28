import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { SubmittionService } from './submittion.service';
import { CreateSubmittionDto } from './dto/create-submittion.dto';
import { UpdateSubmittionDto } from './dto/update-submittion.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { User } from 'src/auth/entities/users.entity';

@Controller('submittion')
export class SubmittionController {
  constructor(private readonly submittionService: SubmittionService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSubmittionDto: CreateSubmittionDto,  @Request() req: any) {
    const user: User = req.user
    return this.submittionService.create(createSubmittionDto, user);
  }

  // @Get()
  // findAll() {
  //   return this.submittionService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.submittionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSubmittionDto: UpdateSubmittionDto) {
  //   return this.submittionService.update(+id, updateSubmittionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.submittionService.remove(+id);
  // }
}
