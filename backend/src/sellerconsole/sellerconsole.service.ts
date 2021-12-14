import { Injectable } from '@nestjs/common';
import { CreateSellerconsoleDto } from './dto/create-sellerconsole.dto';
import { UpdateSellerconsoleDto } from './dto/update-sellerconsole.dto';

@Injectable()
export class SellerconsoleService {
  create(createSellerconsoleDto: CreateSellerconsoleDto) {
    return 'This action adds a new sellerconsole';
  }

  findAll() {
    return `This action returns all sellerconsole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sellerconsole`;
  }

  update(id: number, updateSellerconsoleDto: UpdateSellerconsoleDto) {
    return `This action updates a #${id} sellerconsole`;
  }

  remove(id: number) {
    return `This action removes a #${id} sellerconsole`;
  }
}
