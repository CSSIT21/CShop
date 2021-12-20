import { Injectable } from '@nestjs/common';
import { CreateLogSystemDto } from './dto/create-log-system.dto';
import { UpdateLogSystemDto } from './dto/update-log-system.dto';

@Injectable()
export class LogSystemService {
  create(createLogSystemDto: CreateLogSystemDto) {
    return 'This action adds a new logSystem';
  }

  findAll() {
    return `This action returns all logSystem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logSystem`;
  }

  update(id: number, updateLogSystemDto: UpdateLogSystemDto) {
    return `This action updates a #${id} logSystem`;
  }

  remove(id: number) {
    return `This action removes a #${id} logSystem`;
  }
}
