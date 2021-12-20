import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogSystemService } from './log-system.service';
import { CreateLogSystemDto } from './dto/create-log-system.dto';
import { UpdateLogSystemDto } from './dto/update-log-system.dto';

@Controller('log-system')
export class LogSystemController {
  constructor(private readonly logSystemService: LogSystemService) {}

  @Post()
  create(@Body() createLogSystemDto: CreateLogSystemDto) {
    return this.logSystemService.create(createLogSystemDto);
  }

  @Get()
  findAll() {
    return this.logSystemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logSystemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogSystemDto: UpdateLogSystemDto) {
    return this.logSystemService.update(+id, updateLogSystemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logSystemService.remove(+id);
  }
}
