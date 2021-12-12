import { Injectable } from '@nestjs/common';
import { CreateManageaccountDto } from './dto/create-manageaccount.dto';
import { UpdateManageaccountDto } from './dto/update-manageaccount.dto';

@Injectable()
export class ManageaccountService {
  create(createManageaccountDto: CreateManageaccountDto) {
    return 'This action adds a new manageaccount';
  }

  findAll() {
    return `This action returns all manageaccount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manageaccount`;
  }

  update(id: number, updateManageaccountDto: UpdateManageaccountDto) {
    return `This action updates a #${id} manageaccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} manageaccount`;
  }
}
