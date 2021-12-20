import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	ParseBoolPipe,
	DefaultValuePipe,
	ParseFloatPipe,
	ParseIntPipe,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { Prisma, PrismaClient } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('search')
export class SearchController {
	constructor(private readonly searchService: SearchService, public prisma: PrismaService) {}

	@Post()
	create(@Body() createSearchDto: CreateSearchDto) {
		return this.searchService.create(createSearchDto);
	}

	@Get('message')
	sendMessage() {
		return 'Hello World!';
	}

	@Get()
	@Public()
	async findAll(
		@Query('q', new DefaultValuePipe('')) query: string,
		@Query('priceLow', new DefaultValuePipe(0), ParseFloatPipe) priceLow: number,
		@Query('priceHigh', new DefaultValuePipe(1500), ParseFloatPipe) priceHigh: number,
		@Query('readyToShip', new DefaultValuePipe(true), ParseBoolPipe) readyToShip: boolean,
		@Query('outOfStock', new DefaultValuePipe(false), ParseBoolPipe) outOfStock: boolean,
		@Query('rating', new DefaultValuePipe(0), ParseFloatPipe) rating: number,
		@Query('category', new DefaultValuePipe(0), ParseIntPipe) category: number,
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
		@Query('itemPerPage', new DefaultValuePipe(10), ParseIntPipe) itemPerPage: number,
	) {
		console.log('query: ', query.trim().split(' '));
		console.log('category: ', category);
		let keywords = [];
		for (let k of [...query.trim().split(' '), query]) {
			keywords.push({ title: { contains: k, mode: 'insensitive' } });
		}

		let data;
		if (category === 0) {
			let response = ((await axios.get(`https://ml-1.cshop.cscms.ml/search?q=${query}`)) as { data: any }) || {
				data: [],
			};
			data = response.data;
			if (!Array.isArray(data.products)) {
				return {
					success: false,
					message: data.products,
					products: [],
					total: 0,
					page: 1,
					itemPerPage: itemPerPage,
					pageCount: 0,
					q: query,
				};
			}
			console.log('this is ML Searching!');
		}

		const products = await this.prisma.product.findMany({
			where: {
				...(category === 0 ? { id: { in: [...data?.products] } } : { OR: keywords }),
				...(category !== 0 && { category_id: category }),
				...(readyToShip && {
					quantity: {
						gt: 0,
					},
				}),
				rating: {
					gte: rating,
				},
				price: {
					gte: priceLow,
					lte: priceHigh,
				},
			},
			include: {
				product_picture: true,
			},
		});

		return {
			success: true,
			message: 'Successfully found products',
			products: products.slice((page - 1) * itemPerPage, page * itemPerPage),
			total: products.length,
			page: page,
			itemPerPage: itemPerPage,
			pageCount: Math.ceil(products.length / itemPerPage),
			q: query,
		};
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.prisma.product.findFirst({
			where: {
				id: parseInt(id),
			},
		});
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateSearchDto: UpdateSearchDto) {
		return this.searchService.update(+id, updateSearchDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.searchService.remove(+id);
	}
}
