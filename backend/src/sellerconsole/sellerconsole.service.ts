import { HttpException, Injectable } from '@nestjs/common';
import { CreateSellerconsoleDto } from './dto/create-sellerconsole.dto';
import { UpdateSellerconsoleDto } from './dto/update-sellerconsole.dto';
import { prisma } from '@prisma/client';

@Injectable()
export class SellerconsoleService {

	seller_dashboard(id: number) {
		return `#${id}`;
	}

  seller_stock(id: number) {
		return `#${id}`;
	}

  seller_stocklog(id: number) {
		return `#${id}`;
	}

  seller_orderstatus(id: number) {
		return `#${id}`;
	}

  seller_orderhistory(id: number) {
		return `#${id}`;
	}

  seller_discounthistory(id: number) {
		return `#${id}`;
	}

  seller_refundhistory(id: number) {
		return `#${id}`;
	}
}

// create(createSellerconsoleDto: CreateSellerconsoleDto) {
//   return 'This action adds a new sellerconsole';
// }

// findAll() {
//   return `This action returns all sellerconsole`;
// }

// update(id: number, updateSellerconsoleDto: UpdateSellerconsoleDto) {
//   return `This action updates a #${id} sellerconsole`;
// }

// remove(id: number) {
//   return `This action removes a #${id} sellerconsole`;
// }
