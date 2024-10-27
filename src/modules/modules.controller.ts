import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { User } from 'src/auth/entities/users.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createModuleDto: CreateModuleDto, @Request() req: any) {
    const user: User = req.user
    return this.modulesService.create(createModuleDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto, @Request() req: any) {
    const user: User = req.user
    return this.modulesService.update(+id, updateModuleDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const user: User = req.user
    return this.modulesService.remove(+id, user);
  }
}
