import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from './dto/user.dto';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { FavouriteProduct } from './dto/favourite.dto';
import { Order } from './dto/order.dto';

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Patch('/update')
	@Public()
	public async update(@Body() data: User) {
		return await this.profileService.update(data);
	}

	@Get('/me')
	public async getInfo(@CurrentUser() currentUser) {
		const user = await this.profileService.fetch(currentUser.id);
		delete user.password;
		return {
			success: true,
			message: "Fetching user's info successfully",
			user,
		};
	}

	@Patch('/update/image')
	@Public()
	public async updateImage(@Body() data: User) {
		return await this.profileService.updateImage(data);
	}

	@Post('/followingshop')
	@Public()
	public async getFollowingShop(@Body() data: User, @Query('page', ParseIntPipe) page: number) {
		return await this.profileService.getFollowingShop(data, page);
	}

	@Post('/address/get')
	@Public()
	public async getAddress(@Body() data: User) {
		return await this.profileService.getAddress(data);
	}

	@Post('/address/delete')
	@Public()
	public async deleteAddress(@Body() data: User) {
		return await this.profileService.deleteAddress(data);
	}

	@Post('/address/add')
	@Public()
	public async addAddress(@Body() data: User) {
		return await this.profileService.addAddress(data);
	}

	@Post('/favourite')
	@Public()
	public async favourite(@Body() data: FavouriteProduct) {
		return await this.profileService.favourite(data);
	}

	@Post('/order')
	@Public()
	public async getOrders(@Body() data: Order) {
		return await this.profileService.getOrders(data);
	}

	@Post('/order/detail')
	@Public()
	public async getOrderDetail(@Body() data: Order) {
		return await this.profileService.getOrderDetail(data);
	}
}
