import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SellerconsoleService } from './sellerconsole.service';
import { CreateSellerconsoleDto } from './dto/create-sellerconsole.dto';
import { UpdateSellerconsoleDto } from './dto/update-sellerconsole.dto';

@Controller('sellerconsole')
export class SellerconsoleController {
  constructor(private readonly sellerconsoleService: SellerconsoleService) {}

  @Post()
  create(@Body() createSellerconsoleDto: CreateSellerconsoleDto) {
    return this.sellerconsoleService.create(createSellerconsoleDto);
  }

  @Get()
  findAll() {
    return this.sellerconsoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerconsoleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerconsoleDto: UpdateSellerconsoleDto) {
    return this.sellerconsoleService.update(+id, updateSellerconsoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerconsoleService.remove(+id);
  }
}
