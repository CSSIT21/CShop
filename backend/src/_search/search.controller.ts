import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe, DefaultValuePipe, ParseFloatPipe } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { Prisma, PrismaClient } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { query } from 'express';

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
	findAll(
		@Query('q') query: string,
		@Query('readyToShip', new DefaultValuePipe(true), ParseBoolPipe) readyToShip: boolean,
		@Query('outOfStock', new DefaultValuePipe(false), ParseBoolPipe) outOfStock: boolean,
		@Query('rating', new DefaultValuePipe(0), ParseFloatPipe) rating: number,
	) {
		if (readyToShip && outOfStock) {
			return this.prisma.product.findMany({
				where: {
					title: { contains: query, mode: 'insensitive' },
					rating: {
						gte: rating,
            
					},
				},
			});
		} else if (readyToShip) {
			return this.prisma.product.findMany({
				where: {
					title: { contains: query, mode: 'insensitive' },
					quantity: {
						gt: 0,
					},
					rating: {
						gte: rating,
					},
				},
			});
		}

		return this.prisma.product.findMany({
			where: {
				title: { contains: query, mode: 'insensitive' },
				rating: {
					gte: rating,
				},
			},
		});
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
