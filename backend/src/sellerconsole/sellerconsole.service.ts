import { HttpException, Injectable } from '@nestjs/common';
import { CreateSellerconsoleDto } from './dto/create-sellerconsole.dto';
import { UpdateSellerconsoleDto } from './dto/update-sellerconsole.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Timestamp } from 'rxjs';

@Injectable()
export class SellerconsoleService {
	constructor(private readonly prisma: PrismaService) { }

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

	async getHistoryDiscount(){
        return await this.prisma.discount.findMany()
    }

	async getStock(id : number){
		return await this.prisma.product.findMany({
			where : {
				shop_id : id,
			},
			select : {
				id : true,
				title : true,
				quantity : true,
				price : true,
			}
		})
	}
	async AddToStock(id : number, shopId : number, title : string , sub_title : string ,price : number, quantity : number ,
						categoryId : number, sold : number , added_date : Date, suggest_product : number[] , rating : number){
							console.log({
								id : id,
								shop_id : shopId,
								title : title,
								sub_title : sub_title,
								price : price,
								quantity : quantity,
								category_id : categoryId,
								sold : sold,
								added_date : added_date,
								suggest_products : suggest_product ,
								rating : rating,
							})
		await this.prisma.product.create({
			data : {
				shop_id : shopId,
				title : title,
				sub_title : sub_title,
				price : price,
				quantity : quantity,
				category_id : categoryId,
				sold : sold,
				added_date : added_date,
				suggest_products : suggest_product ,
				rating : rating,

			}
		})
	}
	async UpdatetoStockLog(shopId : number, productId : number , quantity : number, added_date : Date){
	
		await this.prisma.sconsole_stock_history.create({
			data : {
				shop_id : shopId,
				product_id : productId,
				quantity : quantity,
				updated_date : added_date,
			}
		})
		return this.prisma.sconsole_stock_history.findUnique({
			where : {
				id : productId ,
			},
			select : {
				shop_id : true,
				product_id : true,
				quantity : true,
				updated_date: true,
			}
		})
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
