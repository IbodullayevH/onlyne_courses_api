import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmittionService } from './submittion.service';
import { CreateSubmittionDto } from './dto/create-submittion.dto';
import { UpdateSubmittionDto } from './dto/update-submittion.dto';

@Controller('submittion')
export class SubmittionController {
  constructor(private readonly submittionService: SubmittionService) {}

  @Post()
  create(@Body() createSubmittionDto: CreateSubmittionDto) {
    return this.submittionService.create(createSubmittionDto);
  }

  @Get()
  findAll() {
    return this.submittionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submittionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubmittionDto: UpdateSubmittionDto) {
    return this.submittionService.update(+id, updateSubmittionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submittionService.remove(+id);
  }
}
