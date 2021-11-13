import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
	constructor(private readonly prisma: PrismaService) {}

	// @Get('')
	// public GetUser() {
	// 	return this.prisma.customer.count();
	// }

	// @Post('')
	// public async AddUser(@Body('username') username, @Body('password') password) {
	// 	await this.prisma.customer.create({ data: { username, password } });
	// 	return 'Successfully!';
	// }
}
