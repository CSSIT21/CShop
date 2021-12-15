import { Injectable, HttpException } from '@nestjs/common';
import { CreateManageaccountDto } from './dto/create-manageaccount.dto';
import { CreateUserSuspensionDto } from './dto/create_usersuspension.dto';
import { UpdateManageaccountDto } from './dto/update-manageaccount.dto';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ManageaccountService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserSuspensionDto: CreateUserSuspensionDto) {
    try {
			await this.prisma.admin_customer_suspensions.create({
				data: {
          customer_id: createUserSuspensionDto.customer_id,
          description: createUserSuspensionDto.description,
          picture_id: createUserSuspensionDto.picture_id,
          suspension_type_id: createUserSuspensionDto.suspension_type_id,
          admin_id : createUserSuspensionDto.admin_id,
          start_date: new Date(),
          end_date: new Date(),
				},
			});
			return 'User Suspension Added!';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating user suspension!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating user suspension body incorrect', 500);
		}
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
